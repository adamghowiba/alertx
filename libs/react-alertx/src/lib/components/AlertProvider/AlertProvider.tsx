import { Alert, AlertStore } from '@alertx/core';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { AlertContext } from '../../contexts/AlertContext';
import { AlertItem } from '../Alert/AlertItemSJSX';

export interface AlertProviderProps extends PropsWithChildren {
  store: AlertStore;
}

export const AlertProvider: FC<AlertProviderProps> = ({
  children,
  store,
  ...props
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const alertStore = store.on((alert) => {
      setAlerts(alert);
    });

    return () => {
      alertStore.unsubscribe();
    };
  }, [store]);

  return (
    <>
      <AlertContext.Provider
        value={{
          alerts: alerts,
          addAlert: (alert) => {
            store.alert(alert);
          },
          // TODO: Return alert
          removeAlert: (id) => {
            store.remove(id);
          },
          updateAlert: (id, alert) => {
            store.update(id, alert);
          },
        }}
      >
        <div className="alert-container">
          {alerts.map((alert) => (
            <AlertItem
              key={alert.id}
              message={`${alert.message} - ${alert.id}`}
              title={alert?.title}
            />
          ))}
        </div>

        {children}
      </AlertContext.Provider>

      <style jsx>{`
        .alert-container {
          position: fixed;
          left: 1rem;
          bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      `}</style>
    </>
  );
};
