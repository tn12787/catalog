import { AlertDialogProps } from '@chakra-ui/modal';
import { Button, ButtonGroup, useToast } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useRouter } from 'next/router';

import { deleteSingleRelease } from 'queries/releases';
import { ClientRelease } from 'types/common';
import Dialog from 'components/Dialog';

interface Props extends Omit<AlertDialogProps, 'children' | 'leastDestructiveRef'> {
  releaseData?: ClientRelease;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteReleaseDialog = ({ releaseData, onCancel, onConfirm, ...rest }: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteRelease, isLoading } = useMutation(deleteSingleRelease, {
    onSuccess: () => {
      queryClient.invalidateQueries(['releases']);
      router.push('/releases');
    },
  });

  const onDelete = async () => {
    if (!releaseData) return;

    try {
      await deleteRelease(releaseData.id);
      toast({
        status: 'success',
        title: 'Release Deleted',
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
    <Dialog
      onConfirm={onDelete}
      leastDestructiveRef={cancelRef}
      loading={isLoading}
      title="Remove release?"
      message="Are you sure you want to delete this release? This action cannot be undone."
      buttons={
        <ButtonGroup>
          <Button ref={cancelRef} onClick={onCancel}>
            No
          </Button>
          <Button colorScheme="red" isLoading={isLoading} ml={3} onClick={onDelete}>
            Yes
          </Button>
        </ButtonGroup>
      }
      {...rest}
    />
  );
};

export default DeleteReleaseDialog;
