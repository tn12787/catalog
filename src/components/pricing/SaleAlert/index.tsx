import { Alert, AlertTitle, AlertDescription, Stack } from '@chakra-ui/react';
import React from 'react';

const SaleAlert = () => {
  return (
    <Alert
      as={Stack}
      rounded="lg"
      status="success"
      direction={{ base: 'column', md: 'row' }}
      alignItems={{ base: 'center', md: 'stretch' }}
      textAlign={{ base: 'center', md: 'left' }}
    >
      <AlertTitle fontSize={'lg'}>Summer Sale 🌴☀️🕶️</AlertTitle>
      <AlertDescription>
        Save 50% on your first 12 months with code <strong>SUMMER22</strong> at checkout.
      </AlertDescription>
    </Alert>
  );
};

export default SaleAlert;
