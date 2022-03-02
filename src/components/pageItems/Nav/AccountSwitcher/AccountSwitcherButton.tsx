import { Avatar, Box, Text, Flex, FlexProps, HStack, useMenuButton, Stack } from '@chakra-ui/react';
import * as React from 'react';
import { HiSelector } from 'react-icons/hi';

import useAppColors from 'hooks/useAppColors';

interface Props extends FlexProps {
  workspaceName: string;
  userName: string;
  photoUrl: string;
  unreadNotificationCount: number;
}

export const AccountSwitcherButton = ({
  workspaceName,
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
          name={workspaceName}
        />
        <Stack overflow="hidden" textAlign="start" spacing={0}>
          <Text isTruncated fontWeight="semibold">
            {workspaceName}
          </Text>
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
