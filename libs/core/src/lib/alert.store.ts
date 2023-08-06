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
    vertical: 'top' | 'left' | 'center';
    horizontal: 'top' | 'left' | 'center';
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
   * Duration in seconds before an alert is removed
   *
   * @example
   * const showDuration = 0 //=> Never removes alert
   *
   * @example
   * const showDuration = 100 //=> Removes alert after 100 seconds
   */
  showDuration?: number;
}

export class AlertStore {
  private alerts: Alert[] = [];
  private queue: Alert[] = [];
  private hoverStartTimes: Map<string, number> = new Map();
  private elapsedTimes: Map<string, number> = new Map();
  private readonly alertSubject = new Subject<Alert[]>();
  private readonly behaviorSubject = new BehaviorSubject<{ hovering: boolean }>(
    { hovering: false }
  );

  private readonly maxAlerts!: number;
  private readonly showDuration!: number;

  constructor(private readonly config?: AlertStoreConfig) {
    this.maxAlerts = config?.maxAlerts || 2;
    this.showDuration = config?.showDuration || 5;
  }

  isQueueFull() {
    return this.alerts.length >= this.maxAlerts;
  }

  toggleHovering() {
    const hovering = this.behaviorSubject.getValue().hovering;
    return this.behaviorSubject.next({
      ...this.behaviorSubject.getValue(),
      hovering: !hovering,
    });
  }

  setBehavior(behavior: AlertBehavior) {
    return this.behaviorSubject.next({
      ...this.behaviorSubject.getValue(),
      ...behavior,
    });
  }

  private setupTimerForAlert(alertId: string, originalDuration: number) {
    const timerStartTime = Date.now();

    return this.behaviorSubject
      .pipe(
        switchMap((behavior) => {
          if (behavior.hovering) {
            this.hoverStartTimes.set(alertId, Date.now());
            return NEVER;
          } else {
            const currentTime = Date.now();

            // Calculate elapsed time while alert was not hovered over
            const hoverStartTime =
              this.hoverStartTimes.get(alertId) || currentTime;
            const nonHoveredDuration = hoverStartTime - timerStartTime;

            // Calculate the remaining duration for the timer
            const remainingTime = originalDuration - nonHoveredDuration;

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

    if (this.alerts.length >= this.maxAlerts) {
      this.queue = [...this.queue, { ...alert, id }];
      return { id, placedInQueue: true, queueSize: this.queue.length };
    }

    this.alerts = [...this.alerts, { ...alert, id }];
    this.alertSubject.next(this.alerts);

    // TODO: Account for showDuration must be greater than 0
    if (!alert.persist) {
      const alertDuration = alert.showDuration || 3000;
      this.setupTimerForAlert(id, alertDuration);
      // const time = timer(alert.showDuration || 3000).subscribe(() => {
      //   // TODO: Look into checking if I can pause alert closing if it was marked as delayed.
      //   this.remove(id);
      // });
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
    this.behaviorSubject.unsubscribe();
  }
}
