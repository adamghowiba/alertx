import { Alert } from '@alertx/core';
import { createContext, useContext } from 'react';

interface AlertContextState {
  alerts: Alert[];
}

export const AlertContext = createContext<AlertContextState>({ alerts: [] });
