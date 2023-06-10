import { AlertStore } from '@alertx/core';
import { Alert, AlertProvider } from '@alertx/react-alertx';
import Page from './page';

const store = new AlertStore({ maxAlerts: 3 });

export function App() {
  return (
    <AlertProvider store={store}>
      <Page />
    </AlertProvider>
  );
}

export default App;
