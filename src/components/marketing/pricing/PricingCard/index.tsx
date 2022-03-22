import { Text, HStack, Button, Icon, useColorModeValue, Box, Stack, Link } from '@chakra-ui/react';
import React from 'react';
import { capitalize } from 'lodash';
import { BiCheck } from 'react-icons/bi';
import NextLink from 'next/link';

import Card from 'components/Card';
import { PricingStructure, BillingCycle } from 'types/marketing/pricing';
import useAppColors from 'hooks/useAppColors';

type Props = {
  priceInfo: PricingStructure;
  billingCycle: BillingCycle;
  isHighlighted?: boolean;
};

const PricingCard = ({ isHighlighted, priceInfo, billingCycle }: Props) => {
  const { bodySub } = useAppColors();

  const accentColor = useColorModeValue(
    `${priceInfo.colorScheme}.500`,
    `${priceInfo.colorScheme}.200`
  );

  return (
    <Card p={5} spacing={6} w="100%" transform={`scale (${isHighlighted ? '2' : '1'})`}>
      <Stack spacing={4}>
        <Text fontSize="3xl" fontWeight={'black'}>
          {capitalize(priceInfo.name)}
        </Text>
        <Box h={1} w="50px" bg={accentColor}></Box>
        <Text color={bodySub}>{priceInfo.flavorText}</Text>
        <Stack>
          <HStack>
            <Text fontSize="3xl" fontWeight={'medium'}>
              {priceInfo.prices[billingCycle] ? `$${priceInfo.prices[billingCycle]}` : 'Free'}
            </Text>
            <Text fontSize="sm" color={bodySub}>
              {priceInfo.prices[billingCycle]
                ? `${priceInfo.isPerSeat ? 'per user/month' : 'per month'}`
                : ''}
            </Text>
          </HStack>
          <Text fontSize="sm" color={bodySub}>
            {priceInfo.prices[billingCycle]
              ? `billed ${billingCycle === 'monthly' ? 'monthly' : 'annually'}`
              : 'No, really!'}
          </Text>
        </Stack>
        <NextLink href={'/signup'} passHref>
          <Button as={Link} colorScheme={priceInfo.colorScheme} alignSelf="flex-start">
            Get Started
          </Button>
        </NextLink>
      </Stack>
      <Stack spacing={3}>
        <Text fontSize="md" fontWeight={'semibold'}>
          What you get:
        </Text>
        {priceInfo.featureItems.map((feature) => (
          <HStack key={feature}>
            <Icon fontSize="xl" as={BiCheck} color={accentColor}></Icon>
            <Text fontSize="md">{feature}</Text>
          </HStack>
        ))}
      </Stack>
    </Card>
  );
};

export default PricingCard;
