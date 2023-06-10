import React, { FC, PropsWithChildren } from 'react';
import { AlertContext } from '../../contexts/AlertContext';
import { ChildProcess } from 'child_process';
import { AlertStore } from '@alertx/core';

export interface AlertProviderProps extends PropsWithChildren {
  store: AlertStore;
}

export const AlertProvider: FC<AlertProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <>
      <AlertContext.Provider value={{ alerts: [] }}>
        {children}
      </AlertContext.Provider>

      <style jsx>{``}</style>
    </>
  );
};
