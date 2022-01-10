import { useBreakpointValue } from '@chakra-ui/media-query';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/modal';
import React from 'react';

import { EventType } from 'components/Calendar/types';
import EditArtworkForm from 'components/releases/forms/EditArtworkForm';
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
    <Drawer size="lg" placement={variant} isOpen={isOpen} onClose={onClose} {...rest}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          {event?.type === EventType.ARTWORK ? (
            <EditArtworkForm releaseData={event.release} onSubmitSuccess={onClose} />
          ) : (
            'form'
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ReleaseEventDrawer;
