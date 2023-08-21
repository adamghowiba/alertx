import { AppProps } from 'next/app';
import Head from 'next/head';
import '../public/styles/reset.scss';
import '../public/styles/root.scss';
import '../public/styles/global.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to docs!</title>
      </Head>

      <main className="app">
          <Component {...pageProps} />
      </main>

      <style jsx>
        {`
          .app {
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </>
  );
}

export default CustomApp;
