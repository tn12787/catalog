import { Heading, Icon, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import useAppColors from 'hooks/useAppColors';

const InvalidInvitation = () => {
  const { primary } = useAppColors();
  return (
    <Stack>
      <Icon color="red.400" as={FiAlertCircle} fontSize={'4xl'} />
      <Heading size="xl" color="red.400">
        Oh no...
      </Heading>
      <Text>
        This invitation is either invalid or has expired. Please ask your administrator to send
        another one.
      </Text>
      <Link fontSize="sm" color={primary} href="/releases">
        Back to home
      </Link>
    </Stack>
  );
};

export default InvalidInvitation;
