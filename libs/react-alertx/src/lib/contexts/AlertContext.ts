import {
  AddAlertResponse,
  Alert,
  AlertPromise,
  BaseAlertResponse,
  RemoveAlertResponse,
  UpdateAlertResponse,
} from '@alertx/core';
import { createContext, ReactElement } from 'react';

interface AlertContextState {
  alerts: Alert[];
  addAlert: (alert: Alert<ReactElement | ReactElement[]>) => AddAlertResponse;
  alertPromise: (alert: AlertPromise) => Promise<AddAlertResponse>;
  updateAlert: (id: string, alert: Alert) => UpdateAlertResponse | undefined;
  removeAlert: (id: string) => RemoveAlertResponse | undefined;
  /* TODO: Return alerts cleared */
  clear: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
const emptyFunction = (): any => {};

export const AlertContext = createContext<AlertContextState>({
  alerts: [],
  clear: emptyFunction,
  alertPromise: emptyFunction,
  addAlert: emptyFunction,
  removeAlert: emptyFunction,
  updateAlert: emptyFunction,
});
