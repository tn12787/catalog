import { Stack, HStack, Heading, Button, Text, Link, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

import Card from 'components/Card';
import { FeatureKey } from 'common/features/types';
import useFeatures from 'hooks/features/useFeatures';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

const UnlockTasks = () => {
  const { isFeatureEnabled } = useFeatures();
  const { workspace } = useCurrentWorkspace();

  const bgStart = useColorModeValue('blue.100', 'blue.800');
  const bgEnd = useColorModeValue('purple.100', 'purple.800');

  if (!isFeatureEnabled(FeatureKey.PAYMENTS)) {
    return null;
  }

  return (
    <Card p={5} bgGradient={`linear(to-b, ${bgStart}, ${bgEnd})`}>
      <Stack
        spacing={5}
        justifyContent={'space-between'}
        direction={{ base: 'column', lg: 'column' }}
        w="100%"
        alignItems={{ base: 'stretch', md: 'flex-start', lg: 'flex-start' }}
      >
        <HStack>
          <Stack fontSize={'sm'}>
            <Heading size="sm">Do more with tasks</Heading>
            <Text>Assign team members, attach contacts to tasks & more.</Text>
            <Text>Available with the label plan.</Text>
          </Stack>
        </HStack>
        <NextLink href={`/workspaces/${workspace?.id}/upgrade`} passHref>
          <Button as={Link} bg={'white'} color={'black'} variant="outline">
            View plans
          </Button>
        </NextLink>
      </Stack>
    </Card>
  );
};

export default UnlockTasks;
