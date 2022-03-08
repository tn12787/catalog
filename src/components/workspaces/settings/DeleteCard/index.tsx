import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

import Card from 'components/Card';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import { hasRequiredPermissions } from 'utils/auth';
import useExtendedSession from 'hooks/useExtendedSession';
import useWorkspaceMutations from 'hooks/data/workspaces/useWorkspaceMutations';

const MembersCard = () => {
  const { workspace: workspace, isLoading } = useCurrentWorkspace();
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const canDelete = [
    hasRequiredPermissions(['DELETE_TEAM'], workspaceMemberships?.[currentWorkspace]),
  ].every(Boolean);

  const { deleteWorkspace } = useWorkspaceMutations();

  const [inputValue, setInputValue] = useState('');
  const cancelRef = useRef(null);

  const onModalClose = () => {
    setInputValue('');
    onClose();
  };

  if (isLoading || !workspace || !canDelete) return null;
  return (
    <Card
      position="relative"
      borderWidth={'1px'}
      borderColor="red.200"
      align={'flex-start'}
      spacing={3}
    >
      <Heading fontSize="xl" as="h4" fontWeight="semibold">
        Delete workspace
      </Heading>
      <Alert
        w="auto"
        status="error"
        py={2}
        variant={'left-accent'}
        rounded="lg"
        alignSelf={'flex-start'}
      >
        {"Warning: This action can't be undone."}
      </Alert>
      <Text>Delete your entire workspace, including releases, artists, contacts, tasks etc.</Text>
      <Button onClick={onOpen} colorScheme={'red'}>
        Delete {workspace.name}
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
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
                  isLoading={deleteWorkspace.isLoading}
                  onClick={() => {
                    deleteWorkspace.mutate({ id: workspace.id });
                  }}
                >
                  Delete Workspace
                </Button>
                <Button ref={cancelRef} onClick={onModalClose}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default MembersCard;
