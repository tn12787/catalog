// e.g. src/Chakra.js
// a) import `ChakraProvider` component as well as the storageManagers
import { cookieStorageManager, localStorageManager } from '@chakra-ui/color-mode';
import { ChakraProvider } from '@chakra-ui/provider';
import { GetServerSideProps } from 'next';

import { theme } from '../../theme/customTheme';

const ChakraSSRProvider = ({ cookies, children }: any) => {
  const colorModeManager =
    typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;

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
