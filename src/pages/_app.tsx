import { ChakraProvider } from '@chakra-ui/react';
import 'C:UsersTomDocumentsGitHublaunchdaysrcindex.css';
import { appTheme } from 'customTheme';
import { firebaseConfig } from 'firebase-details';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { FirebaseAppProvider } from 'reactfire';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <Head>
        <title>React App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ChakraProvider theme={appTheme}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <Component {...pageProps} />
        </FirebaseAppProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
};

export default MyApp;
