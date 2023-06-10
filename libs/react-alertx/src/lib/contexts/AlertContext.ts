import { Alert } from '@alertx/core';
import { createContext } from 'react';

interface AlertContextState {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  updateAlert: (id: string, alert: Alert) => void;
  removeAlert: (id: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
const emptyFunction = (): any => {};

export const AlertContext = createContext<AlertContextState>({
  alerts: [],
  addAlert: emptyFunction,
  removeAlert: emptyFunction,
  updateAlert: emptyFunction,
});
