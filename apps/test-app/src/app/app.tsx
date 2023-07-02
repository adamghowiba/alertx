import { AlertStatus, AlertStore } from '@alertx/core';
import { Alert, AlertProvider } from '@alertx/react-alertx';
import Page from './page';
import {
  AlertItem,
  AlertItemProps,
} from 'libs/react-alertx/src/lib/components/Alert/AlertItem';
import { FC } from 'react';

const store = new AlertStore({ maxAlerts: 10 });

const CustomAlertItem: FC<AlertItemProps> = ({ ...props }) => {
  console.log(props.status);

  const BG_COLORS: { [Key in AlertStatus]: string } = {
    error: 'red',
    info: 'blue',
    loading: 'gray',
    success: 'green',
    warning: 'yellow',
  };

  return (
    <>
      <div
        className="alert"
        style={{ backgroundColor: BG_COLORS?.[props.status] || 'black' }}
      >
        <span>{props.message}</span>
      </div>

      <style jsx>
        {`
          .alert {
            padding: 1rem;
            width: 200px;
          }
        `}
      </style>
    </>
  );
};

export function App() {
  return (
    <AlertProvider
      store={store}
    >
      <Page />
    </AlertProvider>
  );
}

export default App;
