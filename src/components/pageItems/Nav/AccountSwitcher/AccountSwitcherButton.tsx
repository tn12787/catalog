import { Avatar, Box, Text, Flex, FlexProps, HStack, useMenuButton, Stack } from '@chakra-ui/react';
import * as React from 'react';
import { HiSelector } from 'react-icons/hi';

import useAppColors from 'hooks/useAppColors';
import { EnrichedWorkspace } from 'types/common';
import PlanBadge from 'components/workspaces/PlanBadge';

interface Props extends FlexProps {
  workspace: EnrichedWorkspace | undefined;
  userName: string;
  photoUrl: string;
  unreadNotificationCount: number;
}

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
            <Text noOfLines={1} fontWeight="semibold">
              {workspace?.name ?? 'isLoading'}
            </Text>
            <PlanBadge workspace={workspace as EnrichedWorkspace}></PlanBadge>
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
