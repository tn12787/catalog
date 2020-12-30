import { Spinner } from '@chakra-ui/react';
import App from 'App';
import LoggedOutApp from 'LoggedOutApp';
import React, { Suspense } from 'react';
import { AuthCheck } from 'reactfire';

const Root = () => {
  return (
    <Suspense fallback={Spinner}>
      <AuthCheck fallback={<LoggedOutApp />}>
        <App />
      </AuthCheck>
    </Suspense>
  );
};

export default Root;
