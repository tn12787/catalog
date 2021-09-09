import { Box, ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { appTheme } from 'customTheme';

import 'focus-visible/dist/focus-visible';
import '../index.css';
import '@fontsource/inter';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/variable.css';

interface Props extends Omit<AppProps, 'Component'> {
  Component: NextPage & { getLayout?: () => React.FC<any> };
}

const MyApp = ({ Component, pageProps }: Props) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const Layout = Component.getLayout ? Component.getLayout() : Box;

  return (
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ChakraProvider theme={appTheme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </Hydrate>
        </QueryClientProvider>
      </DndProvider>
    </React.StrictMode>
  );
};

export default MyApp;
