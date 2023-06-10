import { useContext } from 'react';
import { AlertContext } from '../contexts/AlertContext';

export const useAlerts = () => {
  const alerts = useContext(AlertContext);

  return alerts;
};
