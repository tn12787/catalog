import { Text, Heading, Button } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { BiRocket } from 'react-icons/bi';

import Card from 'components/Card';
import { EnrichedTeam } from 'types/common';
import { createCheckout } from 'queries/payments';
import getStripe from 'backend/apiUtils/stripe/client';

type Props = { team: EnrichedTeam; loading?: boolean };

const UpgradeCards = ({ team, loading }: Props) => {
  if (team?.subscription || loading) {
    return null;
  }

  const onUpgradeClick = async () => {
    const {
      data: { sessionId },
    } = await createCheckout({
      teamId: team?.id ?? '',
      quantity: 1,
      priceId: 'price_1KNFjFHNIzcgCVUerPbXkONu',
    });

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <Card alignItems="flex-start" w="100%" bgGradient={'linear(to-tr, red.600, purple.600)'}>
      <Heading color="white" fontSize={'lg'}>
        You're on the free plan
      </Heading>
      <Text color="white">
        Upgrade now to manage multiple artists, contacts, team members, roles, tasks and more.
        Starts at $6 / month.
      </Text>
      <Button leftIcon={<BiRocket />} colorScheme="green" onClick={onUpgradeClick}>
        Upgrade now
      </Button>
    </Card>
  );
};

export default UpgradeCards;
