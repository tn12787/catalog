import { useBreakpointValue } from '@chakra-ui/media-query';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/modal';
import { Button, Divider, Link as ChakraLink, Stack } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import { ReleaseTaskType } from '@prisma/client';

import ReleaseTaskDrawerContent from './ReleaseTaskDrawerContent';
import ReleaseDrawerContent from './ReleaseDrawerContent';

import { EventType, ReleaseEvent } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import { taskHeadingByType } from 'utils/tasks';

interface Props extends Omit<DrawerProps, 'children'> {
  event: ReleaseEvent | undefined;
}

const ReleaseEventDrawer = ({ event, isOpen, onClose, ...rest }: Props) => {
  const variant: DrawerProps['placement'] = useBreakpointValue({
    base: 'bottom',
    md: 'right',
  });

  const { primary } = useAppColors();

  return (
    <Drawer placement={variant} isOpen={isOpen} onClose={onClose} {...rest}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {taskHeadingByType(
            event?.data?.name ?? null,
            event?.data?.type as ReleaseTaskType,
            event?.release.name
          ) ?? 'Loading Artists'}
        </DrawerHeader>
        <DrawerBody>
          {event ? (
            event.type === EventType.RELEASE ? (
              <ReleaseDrawerContent event={event as ReleaseEvent} />
            ) : (
              <ReleaseTaskDrawerContent event={event as ReleaseEvent} />
            )
          ) : null}
        </DrawerBody>
        <DrawerFooter>
          <Stack spacing={4} w="100%" alignItems={'center'}>
            <Divider />
            <Link
              passHref
              href={
                event?.type === EventType.RELEASE
                  ? `/releases/${event.data.id}/`
                  : `/tasks/${event?.data.id}`
              }
            >
              <ChakraLink w="100%" as={Button} fontWeight={'semibold'} color={primary}>
                View full details
              </ChakraLink>
            </Link>
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ReleaseEventDrawer;
