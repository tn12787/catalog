import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { capitalize } from 'lodash';

import { BillingCycle, PricingStructure } from 'types/marketing/pricing';
import useAppColors from 'hooks/useAppColors';

type Props = { priceInfo: PricingStructure; billingCycle: BillingCycle };

const ProductHeader = ({ priceInfo, billingCycle }: Props) => {
  const { bodySub } = useAppColors();
  return (
    <Stack spacing={3}>
      <Text fontSize="xl" fontWeight={'semibold'}>
        {capitalize(priceInfo.name)}
      </Text>
      <HStack>
        <Text fontSize="3xl" fontWeight={'medium'}>
          ${priceInfo.prices[billingCycle]}
        </Text>
        <Text fontSize="sm" color={bodySub}>
          {priceInfo.prices[billingCycle]
            ? `${priceInfo.isPerSeat ? 'per user/month' : 'per month'}`
            : ''}
        </Text>
      </HStack>
      <Button size="sm" colorScheme={'purple'}>
        Sign Up
      </Button>
      <Text alignSelf="center" fontSize="sm" color={bodySub}>
        {priceInfo.prices[billingCycle]
          ? `billed ${billingCycle === 'monthly' ? 'monthly' : 'annually'}`
          : ''}
      </Text>
    </Stack>
  );
};

export default ProductHeader;
