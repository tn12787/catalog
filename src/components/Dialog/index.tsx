import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
} from '@chakra-ui/modal';
import { Button, ButtonGroup } from '@chakra-ui/react';
import React, { LegacyRef } from 'react';

interface Props extends Omit<AlertDialogProps, 'children'> {
  onConfirm: () => void;
  buttons?: React.ReactNode;
  loading?: boolean;
  title: string;
  message: string;
}

const Dialog = ({
  onClose,
  isOpen,
  onConfirm,
  leastDestructiveRef,
  buttons,
  loading,
  title,
  message,
  ...rest
}: Props) => {
  const defaultButtons = (
    <ButtonGroup>
      <Button
        isLoading={loading}
        ref={leastDestructiveRef as LegacyRef<HTMLButtonElement>}
        onClick={onConfirm}
      >
        Okay
      </Button>
    </ButtonGroup>
  );

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      leastDestructiveRef={leastDestructiveRef}
      {...rest}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{message}</AlertDialogBody>
        <AlertDialogFooter>{buttons ?? defaultButtons}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dialog;
