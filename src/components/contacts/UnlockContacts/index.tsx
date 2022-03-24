import { Stack, HStack, Heading, Button, Text, Link, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import Card from 'components/Card';
import { FeatureKey } from 'common/features/types';
import useFeatures from 'hooks/features/useFeatures';
import useAppColors from 'hooks/useAppColors';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

const UnlockContacts = () => {
  const { isFeatureEnabled } = useFeatures();
  const { bgPrimary } = useAppColors();
  const { workspace } = useCurrentWorkspace();

  const bgStart = useColorModeValue('purple.100', 'purple.800');
  const bgEnd = useColorModeValue(bgPrimary, bgPrimary);

  if (!isFeatureEnabled(FeatureKey.PAYMENTS)) {
    return null;
  }

  return (
    <Card p={8} bgGradient={`linear(to-b, ${bgStart}, ${bgEnd})`}>
      <Stack
        spacing={5}
        justifyContent={'space-between'}
        direction={{ base: 'column', lg: 'column' }}
        w="100%"
        alignItems={{ base: 'stretch', md: 'flex-start', lg: 'flex-start' }}
      >
        <HStack>
          <Stack>
            <Heading size="md">Upgrade Required</Heading>
            <Text>Keep track of contacts, link them to tasks, attach labels & more.</Text>
            <Text>Available with any paid plan.</Text>
          </Stack>
        </HStack>
        <Button
          as={Link}
          bg={'white'}
          color={'black'}
          variant="outline"
          href={`/workspaces/${workspace?.id}/upgrade`}
          isExternal
        >
          View plans
        </Button>
      </Stack>
    </Card>
  );
};

export default UnlockContacts;
