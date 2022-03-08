import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Workspace } from '@prisma/client';
import React, { LegacyRef, useState } from 'react';

type Props = Omit<AlertDialogProps, 'children'> & {
  onDelete: () => void;
  isLoading?: boolean;
  workspace: Workspace;
};

const DeleteWorkspaceModal = ({
  leastDestructiveRef,
  isOpen,
  onClose,
  workspace,
  onDelete,
  isLoading,
}: Props) => {
  const [inputValue, setInputValue] = useState('');

  const onModalClose = () => {
    setInputValue('');
    onClose();
  };
  return (
    <AlertDialog
      leastDestructiveRef={leastDestructiveRef}
      size={'lg'}
      isOpen={isOpen}
      onClose={onModalClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent py={2}>
        <AlertDialogHeader>Delete Workspace</AlertDialogHeader>
        <AlertDialogCloseButton></AlertDialogCloseButton>
        <AlertDialogBody>
          <Stack spacing={3}>
            <Text>{"We're sorry to see you go."}</Text>
            <Text display={'inline'}>
              Please enter your workspace name, <strong>{workspace.name}</strong> to confirm
              deletion:
            </Text>
            <FormControl>
              <FormLabel>Workspace name</FormLabel>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={workspace.name}
              ></Input>
            </FormControl>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              alignSelf={{ base: 'stretch', md: 'flex-end' }}
            >
              <Button
                isDisabled={!workspace || workspace.name !== inputValue}
                colorScheme="red"
                isLoading={isLoading}
                onClick={onDelete}
              >
                Delete Workspace
              </Button>
              <Button
                ref={leastDestructiveRef as LegacyRef<HTMLButtonElement>}
                onClick={onModalClose}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkspaceModal;
