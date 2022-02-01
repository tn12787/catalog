import {
  Popover,
  PopoverTrigger,
  HStack,
  Text,
  Link,
  PopoverContent,
  Stack,
  PopoverArrow,
  Divider,
  Badge,
} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useQuery } from 'react-query';

import NotificationPopoverList from './NotificationPopoverList';

import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';
import { fetchNotifications } from 'queries/notifications';
import useNotifications from 'hooks/data/useNotifications';

const NotificationPopover: React.FC = ({ children }) => {
  const { bgSecondary, primary, border } = useAppColors();

  const onOpen = () => {};

  const { data: notifications, isLoading } = useNotifications({});

  const unreadNotifications = notifications?.results.filter((notification) => !notification.read);

  return (
    <Popover placement="right-start" onOpen={onOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        borderColor={border}
        shadow="xl"
        bg={bgSecondary}
        w="auto"
        as={Stack}
        spacing={0}
      >
        <PopoverArrow bg={bgSecondary} />
        <Stack py={2} spacing={0} minW="350px">
          <Stack spacing={2}>
            <HStack px={2} justifyContent={'space-between'}>
              <HStack>
                <Text fontWeight={'semibold'} fontSize="md">
                  Notifications
                </Text>
                {unreadNotifications?.length && (
                  <Badge variant={'solid'} colorScheme={'purple'}>
                    {unreadNotifications?.length}
                  </Badge>
                )}
              </HStack>
            </HStack>
            <Divider />
          </Stack>
          <NotificationPopoverList
            notifications={notifications?.results ?? []}
            loading={isLoading}
          />
          <Stack spacing={0}>
            <Divider />
            <HStack pt={2} justify={'center'}>
              <NextLink passHref href="/notifications">
                <Link fontSize={'sm'} color={primary}>
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
