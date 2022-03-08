import { Alert, Button, Heading, Text, useDisclosure } from '@chakra-ui/react';
import React, { useRef } from 'react';

import DeleteWorkspaceModal from './DeleteWorkspaceModal';

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

  const cancelRef = useRef<HTMLButtonElement>(null);

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
      <DeleteWorkspaceModal
        workspace={workspace}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isLoading={deleteWorkspace.isLoading}
        onDelete={() => {
          deleteWorkspace.mutate({ id: workspace.id });
        }}
      />
    </Card>
  );
};

export default MembersCard;
