import { Avatar, Box, Text, Flex, FlexProps, HStack, useMenuButton, Stack } from '@chakra-ui/react';
import * as React from 'react';
import { HiSelector } from 'react-icons/hi';

import useAppColors from 'hooks/useAppColors';

interface Props extends FlexProps {
  teamName: string;
  userName: string;
  photoUrl: string;
}

export const AccountSwitcherButton = ({ teamName, userName, photoUrl, ...rest }: Props) => {
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
      userSelect="none"
      cursor="pointer"
      outline="none"
      transition="all 0.2s"
      _active={{ bg: bgSecondary }}
    >
      <HStack overflow="hidden" flex="1" spacing="3">
        <Avatar
          size="sm"
          borderRadius="md"
          objectFit="cover"
          src={photoUrl}
          referrerPolicy="no-referrer"
          alt="Team Image"
          name={teamName}
        />
        <Stack overflow="hidden" textAlign="start" spacing={0}>
          <Text isTruncated fontWeight="semibold">
            {teamName}
          </Text>
          <Box fontSize="xs" color="gray.400">
            {userName}
          </Box>
        </Stack>
      </HStack>
      <Box fontSize="lg" color="gray.400">
        <HiSelector />
      </Box>
    </Flex>
  );
};
