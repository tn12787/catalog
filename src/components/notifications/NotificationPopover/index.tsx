import {
  Popover,
  PopoverTrigger,
  HStack,
  Button,
  Text,
  Icon,
  Box,
  Link,
  PopoverContent,
  Stack,
  PopoverArrow,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import { BiBell } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import NextLink from 'next/link';

import NotificationPopoverList from './NotificationPopoverList';

import useAppColors from 'hooks/useAppColors';

const NotificationPopover = () => {
  const { bgSecondary, primary } = useAppColors();

  const onOpen = () => {};

  return (
    <Popover onOpen={onOpen}>
      <PopoverTrigger>
        <IconButton variant="ghost" icon={<BiBell />} aria-label="Notifications" />
      </PopoverTrigger>
      <PopoverContent bg={bgSecondary} w="auto" as={Stack} spacing={0}>
        <PopoverArrow bg={bgSecondary} />
        <Stack py={2} minW="350px">
          <Stack spacing={2}>
            <HStack px={2} justifyContent={'space-between'}>
              <Text fontWeight={'semibold'} fontSize="md">
                Notifications
              </Text>
            </HStack>
            <Divider />
          </Stack>
          <NotificationPopoverList notifications={[]} loading={false} />
          <Stack spacing={0}>
            <Divider />
            <HStack pt={2} justify={'center'}>
              <NextLink passHref href="/notifications">
                <Link fontSize={'xs'} color={primary}>
                  View all
                </Link>
              </NextLink>
            </HStack>
          </Stack>
        </Stack>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
