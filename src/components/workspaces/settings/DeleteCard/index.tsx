import { Alert, Button, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useMemo, useRef } from 'react';

import DeleteWorkspaceModal from './DeleteWorkspaceModal';

import Card from 'components/Card';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import { getAllUserPermissions, hasRequiredPermissions } from 'utils/auth';
import useExtendedSession from 'hooks/useExtendedSession';
import useWorkspaceMutations from 'hooks/data/workspaces/useWorkspaceMutations';
import useAppColors from 'hooks/useAppColors';

const MembersCard = () => {
  const { workspace: workspace, isLoading } = useCurrentWorkspace();
  const { currentWorkspace, workspaceMemberships, workspaceList } = useExtendedSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bodySub } = useAppColors();

  const numberOfAdminWorkspaces = useMemo(() => {
    const allPermissionLists = (workspaceList ?? [])?.map((item) =>
      getAllUserPermissions(item).map((item) => item.name)
    );

    const deletableWorkspaces = allPermissionLists?.filter((permissions) =>
      permissions.includes('DELETE_TEAM')
    );

    return deletableWorkspaces.length;
  }, [workspaceList]);

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
      spacing={6}
    >
      <Stack>
        <Heading fontSize="xl" as="h4" fontWeight="semibold">
          Delete workspace
        </Heading>
        <Alert
          w="auto"
          status="error"
          py={2}
          fontSize="sm"
          variant={'left-accent'}
          rounded="lg"
          alignSelf={'flex-start'}
        >
          {"Warning: This action can't be undone."}
        </Alert>
        <Text>Delete your entire workspace, including releases, artists, contacts, tasks etc.</Text>
      </Stack>

      <Stack
        alignItems={{ base: 'stretch', lg: 'center' }}
        direction={{ base: 'column', lg: 'row' }}
      >
        <Button onClick={onOpen} isDisabled={numberOfAdminWorkspaces === 1} colorScheme={'red'}>
          Delete {workspace.name}
        </Button>

        <Text color={bodySub} fontSize="sm">
          {"This is your only workspace, so you can't delete it."}
        </Text>
      </Stack>
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
