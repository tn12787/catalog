import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { SessionProvider } from 'next-auth/react';
import { ErrorBoundary } from 'react-error-boundary';
import { RetryValue } from 'react-query/types/core/retryer';
import Script from 'next/script';
import { useRouter } from 'next/router';

import ChakraSSRProvider, { getServerSideProps } from 'components/ChakraSSRProvider';
import SomethingWentWrong from 'components/SomethingWentWrong';
import { shouldRetryQuery } from 'utils/queries';
import ga from 'analytics/ga';

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
  const router = useRouter();
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: shouldRetryQuery as RetryValue<unknown>,
          },
        },
      })
  );
  const Layout = Component.getLayout ? Component.getLayout() : Box;

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <React.StrictMode>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MSZB8E8P4E"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-MSZB8E8P4E');
        `}
      </Script>
      <SessionProvider session={pageProps.session}>
        <DndProvider backend={HTML5Backend}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ChakraSSRProvider>
                <Layout>
                  <QueryErrorResetBoundary>
                    {({ reset }) => (
                      <ErrorBoundary onReset={reset} FallbackComponent={SomethingWentWrong}>
                        <Component {...pageProps} />
                      </ErrorBoundary>
                    )}
                  </QueryErrorResetBoundary>
                </Layout>
              </ChakraSSRProvider>
            </Hydrate>
          </QueryClientProvider>
        </DndProvider>
      </SessionProvider>
    </React.StrictMode>
  );
};

// re-export the reusable `getServerSideProps` function
MyApp.getServerSideProps = getServerSideProps;

export default MyApp;
