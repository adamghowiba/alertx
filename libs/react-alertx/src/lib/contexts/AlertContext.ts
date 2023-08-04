import {
  AddAlertResponse,
  Alert,
  AlertPromise,
  AlertWithoutId,
  RemoveAlertResponse,
  UpdateAlertResponse
} from '@alertx/core';
import { ReactElement, ReactNode, createContext } from 'react';

type AlertPramsWithoutMessage<T> = Omit<AlertWithoutId<T>, 'message'>;
type AlertPromisePramsWithoutMessage = Omit<AlertPromise, 'message'>;

interface AlertContextState {
  alerts: Alert[];
  alert: (
    message: ReactNode,
    alert: AlertPramsWithoutMessage<ReactElement | ReactElement[]>
  ) => AddAlertResponse;
  alertPromise: (
    message: ReactNode,
    alert: AlertPromisePramsWithoutMessage
  ) => Promise<AddAlertResponse>;
  updateAlert: (
    id: string,
    alert: Partial<Alert>
  ) => UpdateAlertResponse | undefined;
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
  alert: emptyFunction,
  removeAlert: emptyFunction,
  updateAlert: emptyFunction,
});
