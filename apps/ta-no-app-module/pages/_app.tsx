import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { AlertProvider } from '@alertx/react-alertx';
import { AlertStore } from '@alertx/core';
import '../../../libs/react-alertx-v2/src/lib/style.css'

const alertStore = new AlertStore({});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to ta-no-app-module!</title>
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
