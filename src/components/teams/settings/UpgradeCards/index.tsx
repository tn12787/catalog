import { Text, Heading, Button } from '@chakra-ui/react';
import React from 'react';
import { BiRocket } from 'react-icons/bi';

import Card from 'components/Card';
import useCurrentTeam from 'hooks/data/team/useCurrentTeam';

const UpgradeCards = () => {
  const { team, isLoading, checkout } = useCurrentTeam();

  if (team?.subscription || isLoading) {
    return null;
  }

  return (
    <Card alignItems="flex-start" w="100%" bgGradient={'linear(to-tr, red.600, purple.600)'}>
      <Heading color="white" fontSize={'lg'}>
        {"You're on the free plan"}
      </Heading>
      <Text color="white">
        Upgrade now to manage multiple artists, contacts, team members, roles, tasks and more.
        Starts at $6 / month.
      </Text>
      <Button leftIcon={<BiRocket />} colorScheme="green" onClick={() => checkout()}>
        Upgrade now
      </Button>
    </Card>
  );
};

export default UpgradeCards;
