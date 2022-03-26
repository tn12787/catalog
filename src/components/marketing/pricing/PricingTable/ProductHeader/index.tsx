import { Badge, Button, Heading, HStack, Link, Skeleton, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { capitalize } from 'lodash';
import NextLink from 'next/link';
import Stripe from 'stripe';
import { BillingInterval } from '@prisma/client';

import { PricingStructure } from 'types/marketing/pricing';
import useAppColors from 'hooks/useAppColors';
import { priceToString } from 'utils/billing';
import { EnrichedWorkspace } from 'types/common';

type Props = {
  workspace?: EnrichedWorkspace;
  priceInfo: PricingStructure;
  billingCycle: BillingInterval;
  isLoading?: boolean;
  isHighlighted?: boolean;
  onPlanSelected?: (price: Stripe.Price | undefined) => void;
};

const ProductHeader = ({
  workspace,
  priceInfo,
  billingCycle,
  isLoading,
  isHighlighted,
  onPlanSelected,
}: Props) => {
  const selectedPrice = priceInfo.product?.prices[billingCycle];

  const { bodySub } = useAppColors();
  return (
    <Stack spacing={2}>
      <Heading fontSize="xl">
        {capitalize(priceInfo.name)}{' '}
        {isHighlighted && (
          <Badge variant="solid" alignSelf={'flex-start'} colorScheme={priceInfo.colorScheme}>
            Current Plan
          </Badge>
        )}
      </Heading>
      <Skeleton alignSelf={'flex-start'} isLoaded={!isLoading}>
        <HStack>
          <Text fontSize="2xl" fontWeight={'medium'}>
            {selectedPrice ? `$${priceToString(selectedPrice)}` : 'Free'}
          </Text>
          <Text fontSize="sm" color={bodySub}>
            {selectedPrice ? `${priceInfo.isPerSeat ? 'per user/month' : 'per month'}` : ''}
          </Text>
        </HStack>
      </Skeleton>
      <Skeleton isLoaded={!isLoading}>
        {workspace ? (
          <Button
            size="sm"
            w="100%"
            isDisabled={!workspace.subscription && isHighlighted}
            onClick={() => onPlanSelected?.(selectedPrice)}
            colorScheme={priceInfo.colorScheme}
          >
            {workspace ? (isHighlighted ? 'Manage' : 'Choose plan') : 'Get Started'}
          </Button>
        ) : (
          <NextLink href={'/signup'} passHref>
            <Button w="100%" size="sm" as={Link} colorScheme={priceInfo.colorScheme}>
              {'Get Started'}
            </Button>
          </NextLink>
        )}
      </Skeleton>
      <Text alignSelf="center" fontSize="sm" color={bodySub}>
        {selectedPrice ? `billed ${billingCycle === 'monthly' ? 'monthly' : 'annually'}` : ''}
      </Text>
    </Stack>
  );
};

export default ProductHeader;
