import { Text, Heading, Button, useColorModeValue, Link } from '@chakra-ui/react';
import React from 'react';
import { BiRocket } from 'react-icons/bi';
import NextLink from 'next/link';

import Card from 'components/Card';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import { FeatureKey } from 'common/features/types';
import useFeatures from 'hooks/features/useFeatures';
import useAppColors from 'hooks/useAppColors';

const UpgradeCards = () => {
  const { workspace, isLoading } = useCurrentWorkspace();
  const { isFeatureEnabled } = useFeatures();
  const { bgPrimary } = useAppColors();

  const bgStart = useColorModeValue('green.200', 'green.800');
  const bgEnd = useColorModeValue(bgPrimary, bgPrimary);
  if (workspace?.subscription || isLoading || !isFeatureEnabled(FeatureKey.PAYMENTS)) {
    return null;
  }

  return (
    <Card py={7} alignItems="flex-start" w="100%" bgGradient={`linear(to-b, ${bgStart}, ${bgEnd})`}>
      <Heading fontSize={'lg'}>{"You're on the free plan"}</Heading>
      <Text>
        Upgrade now to manage multiple artists, contacts, workspace members, roles, tasks and more.
      </Text>
      <NextLink href={`/workspaces/${workspace?.id}/upgrade`} passHref>
        <Button leftIcon={<BiRocket />} colorScheme="purple" as={Link}>
          Upgrade now
        </Button>
      </NextLink>
    </Card>
  );
};

export default UpgradeCards;
