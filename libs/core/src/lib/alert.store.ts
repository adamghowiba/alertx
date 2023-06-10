/*
Used to handle alert related logic
*/

import { Subject } from 'rxjs';

export interface AlertDetails {
  id: string;
  title?: string;
  message: string;
  helperText: string;
}

export interface AlertConfig {
  showDuration?: number;
  persist?: boolean;
  anchorOrigin?: {
    vertical: 'top' | 'left' | 'center';
    horizontal: 'top' | 'left' | 'center';
  };
  loading?: boolean;
}

export type Alert = AlertDetails & AlertConfig;

export class AlertStore {
  private alerts: Alert[] = [];
  private readonly subject = new Subject<Alert[]>();

  alert(params: Alert) {
    this.alerts = [...this.alerts, params];
    this.subject.next(this.alerts);

    if (!params.persist) {
      setTimeout(() => {
        this.remove(params.id);
      }, params.showDuration);
    }
  }

  remove(id: string) {
    this.alerts = this.alerts.filter((alert) => alert.id === id);
    this.subject.next(this.alerts);
  }

  update(id: string, alerts: Alert) {
    this.alerts = this.alerts.map((alert) => {
      if (alert.id === id) return { ...alert, alerts };

      return { ...alert };
    });
    this.subject.next(this.alerts);
  }
}
