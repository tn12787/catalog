import {
  Avatar,
  Box,
  Text,
  Flex,
  FlexProps,
  HStack,
  useMenuButton,
  Stack,
  Badge,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiSelector } from 'react-icons/hi';

import useAppColors from 'hooks/useAppColors';
import { EnrichedWorkspace } from 'types/common';
import { priceData } from 'components/marketing/pricing/PricingTable/productData';

interface Props extends FlexProps {
  workspace: EnrichedWorkspace | undefined;
  userName: string;
  photoUrl: string;
  unreadNotificationCount: number;
}

const badgeFromWorkspace = (workspace: EnrichedWorkspace | undefined) => {
  switch (workspace?.subscription?.product?.name) {
    case 'Manager Plan':
      return 'Manager';
    case 'Label Plan':
      return 'Label';
    default:
      return 'Artist';
  }
};

const badgeColorSchemeFromWorkspace = (workspace: EnrichedWorkspace | undefined) => {
  const enrichedPrices = priceData([]);
  switch (workspace?.subscription?.product?.name) {
    case 'Manager Plan':
      return enrichedPrices.manager.colorScheme;
    case 'Label Plan':
      return enrichedPrices.label.colorScheme;
    default:
      return enrichedPrices.artist.colorScheme;
  }
};

export const AccountSwitcherButton = ({
  workspace,
  userName,
  photoUrl,
  unreadNotificationCount,
  ...rest
}: Props) => {
  const buttonProps = useMenuButton(rest);
  const { bgPrimary, bgSecondary } = useAppColors();
  return (
    <Flex
      {...buttonProps}
      as="button"
      w="full"
      display="flex"
      alignItems="center"
      rounded="lg"
      bg={bgPrimary}
      px="3"
      py="2"
      fontSize="sm"
      _active={{ bg: bgSecondary }}
    >
      <HStack overflow="hidden" flex="1" spacing="3">
        <Avatar
          size="sm"
          borderRadius="md"
          objectFit="cover"
          src={photoUrl}
          referrerPolicy="no-referrer"
          alt="Workspace Image"
          name={workspace?.name}
        />
        <Stack overflow="hidden" textAlign="start" spacing={0}>
          <HStack>
            <Text isTruncated fontWeight="semibold">
              {workspace?.name ?? 'isLoading'}
            </Text>
            <Badge colorScheme={badgeColorSchemeFromWorkspace(workspace)}>
              {badgeFromWorkspace(workspace)}
            </Badge>
          </HStack>
          <Box fontSize="xs" color="gray.400">
            {userName}
          </Box>
        </Stack>
      </HStack>
      <Box fontSize="lg" color="gray.400">
        <HiSelector />
      </Box>
      {unreadNotificationCount > 0 && <Box bg="red.500" borderRadius={'full'} w={2} h={2}></Box>}
    </Flex>
  );
};
