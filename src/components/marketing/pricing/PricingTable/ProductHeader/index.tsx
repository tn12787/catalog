import { Button, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { capitalize } from 'lodash';
import NextLink from 'next/link';

import { BillingCycle, PricingStructure } from 'types/marketing/pricing';
import useAppColors from 'hooks/useAppColors';
import { priceToString } from 'utils/billing';

type Props = { priceInfo: PricingStructure; billingCycle: BillingCycle };

const ProductHeader = ({ priceInfo, billingCycle }: Props) => {
  const selectedPrice = priceInfo.product?.prices[billingCycle];

  const { bodySub } = useAppColors();
  return (
    <Stack spacing={2}>
      <Heading fontSize="xl">{capitalize(priceInfo.name)}</Heading>
      <HStack>
        <Text fontSize="2xl" fontWeight={'medium'}>
          {selectedPrice ? `$${priceToString(selectedPrice)}` : 'Free'}
        </Text>
        <Text fontSize="sm" color={bodySub}>
          {selectedPrice ? `${priceInfo.isPerSeat ? 'per user/month' : 'per month'}` : ''}
        </Text>
      </HStack>
      <NextLink href={'/signup'} passHref>
        <Button as={Link} size="sm" colorScheme={priceInfo.colorScheme}>
          Sign Up
        </Button>
      </NextLink>
      <Text alignSelf="center" fontSize="sm" color={bodySub}>
        {selectedPrice ? `billed ${billingCycle === 'monthly' ? 'monthly' : 'annually'}` : ''}
      </Text>
    </Stack>
  );
};

export default ProductHeader;
