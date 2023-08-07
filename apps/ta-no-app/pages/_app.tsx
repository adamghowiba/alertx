import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { AlertProvider, AlertStore } from '@alertx/react-alertx';

const alertStore = new AlertStore({ maxAlerts: 20});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to ta-no-app!</title>
      </Head>

      <main className="app">
        <AlertProvider store={alertStore}>
          <Component {...pageProps} />
        </AlertProvider>
      </main>
    </>
  );
}

export default CustomApp;
