import { Box, ChakraProvider } from '@chakra-ui/react';
import { appTheme } from 'customTheme';
import { firebaseConfig } from 'firebase-details';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React from 'react';
import { FirebaseAppProvider } from 'reactfire';
import '../index.css';

interface Props extends Omit<AppProps, 'Component'> {
  Component: NextPage & { getLayout?: () => React.FC<any> };
}

const MyApp = ({ Component, pageProps }: Props) => {
  const Layout = Component.getLayout ? Component.getLayout() : Box;

  return (
    <React.StrictMode>
      <ChakraProvider theme={appTheme}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FirebaseAppProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
};

export default MyApp;
