/*
Used to handle alert related logic
*/
import { Subject, timer } from 'rxjs';
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
  private readonly subject = new Subject<Alert[]>();

  private readonly maxAlerts!: number;
  private readonly showDuration!: number;

  constructor(private readonly config?: AlertStoreConfig) {
    this.maxAlerts = config?.maxAlerts || 2;
    this.showDuration = config?.showDuration || 5;
  }

  isQueueFull() {
    return this.alerts.length >= this.maxAlerts;
  }

  alert(alert: AlertWithoutId): AddAlertResponse {
    const id = nanoid();

    if (this.alerts.length >= this.maxAlerts) {
      this.queue = [...this.queue, { ...alert, id }];
      return { id, placedInQueue: true, queueSize: this.queue.length };
    }

    this.alerts = [...this.alerts, { ...alert, id }];
    this.subject.next(this.alerts);

    if (!alert.persist) {
      timer(alert.showDuration || 3000).subscribe(() => {
        this.remove(id);
      });
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

    this.subject.next(this.alerts);
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

    this.subject.next(this.alerts);
    return updatedAlert;
  }

  clear() {
    this.alerts = [];
    this.subject.next(this.alerts);
  }

  clearQueue() {
    this.queue = [];
  }

  on(callback: (alerts: Alert[]) => void) {
    return this.subject.subscribe((alerts) => callback(alerts));
  }
}
