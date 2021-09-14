import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { useBreakpointValue, useMediaQuery } from '@chakra-ui/media-query';
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
import React from 'react';

import { EventType } from 'components/Calendar/types';
import { EditArtworkFormWithoutData } from 'components/releases/specific/Artwork/EditArtworkForm';
import { ReleaseEvent } from 'types';

interface Props extends Omit<DrawerProps, 'children'> {
  event: ReleaseEvent | undefined;
}

const ReleaseEventDrawer = ({ event, isOpen, onClose, ...rest }: Props) => {
  const variant: DrawerProps['placement'] = useBreakpointValue({
    base: 'bottom',
    md: 'right',
  });
  return (
    <Drawer
      size="lg"
      placement={variant}
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          {event?.type === EventType.ARTWORK ? (
            <EditArtworkFormWithoutData releaseData={event.release} />
          ) : (
            'form'
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ReleaseEventDrawer;
