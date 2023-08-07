/**
 * @description framework agnostic alert store
 * used to manage alerts within an application.
 */
import {
  BehaviorSubject,
  NEVER,
  Observable,
  Subject,
  map,
  switchMap,
  take,
  timer,
} from 'rxjs';
import { nanoid } from 'nanoid';

export type AlertStatus = 'success' | 'warning' | 'error' | 'info' | 'loading';

export type xLocation = 'left' | 'right' | 'center';
export type yLocation = 'top' | 'center' | 'bottom';

export interface Alert<Message = any, Action = any> {
  id: string;
  title?: Message;
  message: Message;
  /**
   * Duration to show the alert in milliseconds
   */
  showDuration?: number;
  persist?: boolean;
  status?: AlertStatus;
  anchorOrigin?: {
    x: xLocation;
    y: yLocation;
  };
  loading?: boolean;
  actions?: Action | ((params: { id: string }) => Action);
}

export type AlertWithoutId<Message = any, Action = any> = Omit<
  Alert<Message, Action>,
  'id'
> & { id?: string };

export interface AlertPromise extends Alert {
  alertPromise: Promise<any>;
}

export interface AlertActions {
  name: string;
  onClick: (alert: Alert) => void;
}

export interface BaseAlertResponse {
  id: string;
}

export interface AddAlertResponse extends BaseAlertResponse {
  placedInQueue: boolean;
  queueSize: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateAlertResponse extends BaseAlertResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RemoveAlertResponse extends BaseAlertResponse {}

export interface AlertBehavior {
  hovering: boolean;
}

export interface AlertStoreConfig {
  /**
   * Maximum number of alerts allowed on the screen.
   * Any alerts that exceed this amount will go into
   * the alert queue.
   *
   * @default 2
   */
  maxAlerts?: number;

  /**
   * Duration in milliseconds before an alert is removed
   *
   * @example
   * const showDuration = 0 //=> Never removes alert
   *
   * @example
   * const showDuration = 100 //=> Removes alert after 100 seconds
   *
   * @default 3000
   */
  showDuration?: number;

  /**
   * Pause alert removal when hovering.
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Don't remove alerts. Alerts must be manually removed.
   *
   * @default false
   */
  persist?: boolean;
}

const DEFAULT_STORE_CONFIG: Required<AlertStoreConfig> = {
  maxAlerts: 2,
  pauseOnHover: true,
  persist: false,
  showDuration: 3000,
};

export class AlertStore {
  private alerts: Alert[] = [];
  private queue: Alert[] = [];
  private hoverStartTimes: Map<string, number> = new Map();
  private elapsedTimes: Map<string, number> = new Map();
  private readonly alertSubject = new Subject<Alert[]>();
  // private readonly behaviorSubject = new BehaviorSubject<{ hovering: boolean }>(
  //   { hovering: false }
  // );
  private readonly statusSubject = new BehaviorSubject<{
    paused: boolean | string[];
  }>({
    paused: false,
  });

  private readonly config: Required<AlertStoreConfig> = DEFAULT_STORE_CONFIG;

  constructor(config?: AlertStoreConfig) {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  isQueueFull() {
    return this.alerts.length >= this.config.maxAlerts;
  }

  pauseRemoval(alertId?: string) {
    return this.statusSubject.next({
      ...this.statusSubject.getValue(),
      paused: true,
    });
  }

  unpauseRemoval(alertId?: string) {
    return this.statusSubject.next({
      ...this.statusSubject.getValue(),
      paused: false,
    });
  }

  toggleHovering() {
    const paused = this.statusSubject.getValue().paused;

    return this.statusSubject.next({
      ...this.statusSubject.getValue(),
      paused: !paused,
    });
  }

  // setBehavior(behavior: AlertBehavior) {
  //   return this.behaviorSubject.next({
  //     ...this.behaviorSubject.getValue(),
  //     ...behavior,
  //   });
  // }

  private setupTimerForAlert(alertId: string, originalDuration: number) {
    const timerStartTime = Date.now();

    return this.statusSubject
      .pipe(
        switchMap((behavior) => {
          if (behavior.paused) {
            this.hoverStartTimes.set(alertId, Date.now());
            console.log('Paused alerts', behavior.paused);
            return NEVER;
          } else {
            const currentTime = Date.now();

            // Calculate elapsed time while alert was not hovered over
            const hoverStartTime =
              this.hoverStartTimes.get(alertId) || currentTime;
            const nonHoveredDuration = hoverStartTime - timerStartTime;

            // Calculate the remaining duration for the timer
            const remainingTime = originalDuration - nonHoveredDuration;
            console.log(`Unpaused`, remainingTime / 1000);

            return timer(Math.max(remainingTime, 0));
          }
        }),
        // Ensure the observable completes after one emission to avoid re-entry into the switchMap.
        take(1)
      )
      .subscribe(() => {
        this.remove(alertId);
        this.hoverStartTimes.delete(alertId);
      });
  }

  alert(alert: AlertWithoutId): AddAlertResponse {
    const id = nanoid();

    if (this.alerts.length >= this.config.maxAlerts) {
      this.queue = [...this.queue, { ...alert, id }];
      return { id, placedInQueue: true, queueSize: this.queue.length };
    }

    const alertToBeAdded: Alert = {
      anchorOrigin: { x: 'left', y: 'bottom' },
      ...alert,
      id,
    };

    this.alerts = [...this.alerts, alertToBeAdded];
    this.alertSubject.next(this.alerts);

    const persist = alert.persist || this.config.persist;
    const showDuration = alert.showDuration || this.config.showDuration;

    if (persist !== true && showDuration > 0) {
      const alertDuration = alert.showDuration || this.config.showDuration;
      this.setupTimerForAlert(id, alertDuration);
    }

    return { id, placedInQueue: false, queueSize: this.queue.length };
  }

  async alertPromise(alert: AlertPromise): Promise<AddAlertResponse> {
    const { id, placedInQueue, queueSize } = this.alert({
      ...alert,
      status: 'loading',
    });

    try {
      await alert.alertPromise;
      this.update(id, { status: 'success' });
    } catch (error) {
      this.update(id, { status: 'error' });
    }

    return { id, placedInQueue: false, queueSize: this.queue.length };
  }

  remove(id: string): RemoveAlertResponse | undefined {
    const alertToRemove = this.alerts.find((alert) => alert.id === id);
    if (!alertToRemove?.id) return;

    this.alerts = this.alerts.filter((alert) => {
      return alert.id !== id;
    });

    if (this.queue.length) {
      const firstQueueElement = this.queue.splice(this.queue.length - 1, 1)[0];

      if (firstQueueElement) this.alert(firstQueueElement);
    }

    this.alertSubject.next(this.alerts);
    return { id: alertToRemove.id };
  }

  update(
    id: string,
    alertUpdates: Partial<Alert>
  ): UpdateAlertResponse | undefined {
    const alertToUpdate = this.alerts.find((alert) => alert.id === id);
    if (!alertToUpdate?.id) return;

    let updatedAlert: Alert | undefined = undefined;

    this.alerts = this.alerts.map((alert) => {
      if (alert.id === id) {
        updatedAlert = { ...alert, ...alertUpdates };
        return updatedAlert;
      }

      return alert;
    });

    this.alertSubject.next(this.alerts);
    return updatedAlert;
  }

  clear() {
    this.alerts = [];
    this.alertSubject.next(this.alerts);
  }

  clearQueue() {
    this.queue = [];
  }

  on(callback: (alerts: Alert[]) => void) {
    return this.alertSubject.subscribe((alerts) => callback(alerts));
  }

  cleanUp() {
    this.alertSubject.unsubscribe();
    this.statusSubject.unsubscribe();
  }
}
