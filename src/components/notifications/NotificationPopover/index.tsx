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
  Button,
  useBreakpointValue,
  PlacementWithLogical,
} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { BiCheckDouble } from 'react-icons/bi';

import NotificationPopoverList from './NotificationPopoverList';

import useAppColors from 'hooks/useAppColors';
import useNotifications from 'hooks/data/notifications/useNotifications';
import useUpdateAllNotifications from 'hooks/data/notifications/useUpdateAllNotifications.ts';

const NotificationPopover: React.FC = ({ children }) => {
  const { bgSecondary, primary, border } = useAppColors();

  const { data: notifications, isLoading } = useNotifications({});
  const { data: unreadNotifications } = useNotifications({ read: false });

  const { updateAll, isLoading: isUpdateAllLoading } = useUpdateAllNotifications();
  const popoverPlacement = useBreakpointValue({ base: 'top', md: 'right-start' }) ?? 'right-start';

  return (
    <Popover placement={popoverPlacement as PlacementWithLogical}>
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
                {unreadNotifications?.total && (
                  <Badge variant={'solid'} colorScheme={'purple'}>
                    {unreadNotifications?.total}
                  </Badge>
                )}
              </HStack>
              {unreadNotifications?.total && (
                <Button
                  isLoading={isUpdateAllLoading}
                  onClick={() => updateAll('read')}
                  colorScheme="purple"
                  size="xs"
                  variant="link"
                  leftIcon={<BiCheckDouble />}
                >
                  Mark all as read
                </Button>
              )}
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
