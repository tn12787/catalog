// e.g. src/Chakra.js
// a) import `ChakraProvider` component as well as the storageManagers
import { ChakraProvider } from '@chakra-ui/provider';
import { createCookieStorageManager, createLocalStorageManager } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { theme } from '../../theme/customTheme';

const localStorageManager = createLocalStorageManager('catalog-color-mode');

const ChakraSSRProvider = ({ cookies, children }: any) => {
  const colorModeManager =
    typeof cookies === 'string' ? createCookieStorageManager(cookies) : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  };
};

export default ChakraSSRProvider;
