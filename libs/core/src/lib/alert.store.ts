/*
Used to handle alert related logic
*/

import { Subject, timer } from 'rxjs';

export interface Alert {
  id: string;
  title?: string;
  message: string;
  showDuration?: number;
  persist?: boolean;
  anchorOrigin?: {
    vertical: 'top' | 'left' | 'center';
    horizontal: 'top' | 'left' | 'center';
  };
  loading?: boolean;
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
    this.maxAlerts = config.maxAlerts || 5;
  }

  getIsQueueFull() {
    return this.alerts.length >= this.maxAlerts;
  }

  alert(params: Alert) {
    this.alerts = [...this.alerts, params];
    this.subject.next(this.alerts);

    if (!params.persist) {
      timer(params.showDuration || 3000).subscribe(() => {
        this.remove(params.id);
      });
    }
  }

  remove(id: string) {
    this.alerts = this.alerts.filter((alert) => alert.id !== id);
    this.subject.next(this.alerts);
  }

  update(id: string, alerts: Alert) {
    this.alerts = this.alerts.map((alert) => {
      if (alert.id === id) return { ...alert, alerts };

      return { ...alert };
    });
    this.subject.next(this.alerts);
  }

  on(callback: (alerts: Alert[]) => void) {
    return this.subject.subscribe((alerts) => callback(alerts));
  }
}
