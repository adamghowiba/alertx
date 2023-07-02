/*
Used to handle alert related logic
*/
import { Subject, timer } from 'rxjs';
import { nanoid } from 'nanoid';

export type AlertStatus = 'success' | 'warning' | 'error' | 'info' | 'loading';

export interface AlertActions {
  name: string;
  onClick: (alert: Alert) => void;
}

export interface Alert<Actions = any> {
  id?: string;
  title?: string;
  message: string;
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
  actions?: Actions | ((params: { id: string }) => Actions);
}

export interface BaseAlertResponse {
  id: string;
}

export interface AddAlertResponse extends BaseAlertResponse {
  placedInQueue: boolean;
  queueSize: number;
}

export interface UpdateAlertResponse extends BaseAlertResponse {}
export interface RemoveAlertResponse extends BaseAlertResponse {}

export interface AlertPromise extends Alert {
  alertPromise: Promise<any>;
}

export interface AlertStoreConfig {
  maxAlerts?: number;
}

export class AlertStore {
  private alerts: Alert[] = [];
  private queue: Alert[] = [];
  private readonly subject = new Subject<Alert[]>();

  private readonly maxAlerts: number;

  constructor(private readonly config: AlertStoreConfig) {
    this.maxAlerts = config.maxAlerts || 2;
  }

  isQueueFull() {
    return this.alerts.length >= this.maxAlerts;
  }

  alert(alert: Alert): AddAlertResponse {
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
    const id = nanoid();

    if (this.alerts.length >= this.maxAlerts) {
      this.queue = [...this.queue, { ...alert, id }];
      return { id, placedInQueue: true, queueSize: this.queue.length };
    }

    this.alerts = [...this.alerts, { ...alert, status: 'loading', id }];
    this.subject.next(this.alerts);

    try {
      await alert.alertPromise;
      this.update(id, { status: 'success' });
    } catch (error) {
      this.update(id, { status: 'error' });
    }

    if (!alert.persist) {
      timer(alert.showDuration || 3000).subscribe(() => {
        this.remove(id);
      });
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
