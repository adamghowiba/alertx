import { AlertStatus, AlertStore } from '@alertx/core';
import { Alert, AlertProvider } from '@alertx/react-alertx';
import Page from './page';
import { FC } from 'react';
import { AlertProps } from '@alertx/react-alertx';
import StyledJsxRegistry from './registry';

const store = new AlertStore({ maxAlerts: 10 });

export function App() {
  return (
    <AlertProvider store={store}>
      <Page />
    </AlertProvider>
  );
}

const CustomAlertItem: FC<AlertProps> = ({ ...props }) => {
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
        style={{
          backgroundColor:
            (props.status && BG_COLORS?.[props?.status]) || 'black',
        }}
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

export default App;
