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
import { Button, toast, useToast } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useQueryClient, useMutation } from 'react-query';

import { deleteSingleRelease } from 'queries/releases';
import { EnrichedRelease } from 'types';

interface Props extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  releaseData?: EnrichedRelease;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteReleaseDialog = ({
  onClose,
  isOpen,
  releaseData,
  onCancel,
  onConfirm,
  ...rest
}: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteRelease, isLoading } = useMutation(deleteSingleRelease, {
    onSuccess: () => {
      queryClient.invalidateQueries(['releases']);
    },
  });

  const onDelete = async () => {
    if (!releaseData) return;

    try {
      await deleteRelease(releaseData.id);
      toast({
        status: 'success',
        title: 'Deleted',
        description: 'Your release was deleted successfully.',
      });
      onConfirm();
    } catch (error: any) {
      toast({
        status: 'error',
        title: 'Oh no...',
        description: error.toString(),
      });
    }
  };

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      leastDestructiveRef={cancelRef}
      {...rest}
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Remove Release?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to delete this release? This action cannot be undone.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onCancel}>
            No
          </Button>
          <Button colorScheme="red" isLoading={isLoading} ml={3} onClick={onDelete}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteReleaseDialog;
