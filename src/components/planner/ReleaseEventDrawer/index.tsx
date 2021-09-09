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

interface Props extends Omit<DrawerProps, 'children'> {}

const ReleaseEventDrawer = ({ isOpen, onClose, ...rest }: Props) => {
  const variant: DrawerProps['placement'] = useBreakpointValue({
    base: 'bottom',
    md: 'right',
  });
  return (
    <Drawer placement={variant} isOpen={isOpen} onClose={onClose} {...rest}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>
        <DrawerBody>
          <form
            id="my-form"
            onSubmit={(e) => {
              e.preventDefault();
              console.log('submitted');
            }}
          >
            <Input name="nickname" placeholder="Type here..." />
          </form>
        </DrawerBody>
        <DrawerFooter>
          <Button type="submit" form="my-form">
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ReleaseEventDrawer;
