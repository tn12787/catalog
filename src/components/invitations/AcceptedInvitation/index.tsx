import { Heading, Icon, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const AcceptedInvitation = () => {
  return (
    <Stack>
      <Icon color="green.400" as={FiCheckCircle} fontSize={'4xl'} />
      <Heading size="xl" color="green.400">
        Invite accepted
      </Heading>
      <Text>{"Welcome to your new workspace. You'll be redirected in a moment."}</Text>
    </Stack>
  );
};

export default AcceptedInvitation;
