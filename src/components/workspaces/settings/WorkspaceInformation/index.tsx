import React, { useState } from 'react';
import { Heading, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { FiEdit } from 'react-icons/fi';
import { Avatar } from '@chakra-ui/react';

import EditWorkspaceInfoForm from './EditWorkspaceInfoForm';

import Card from 'components/Card';
import DataList from 'components/data/DataList';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

const WorkspaceInformation = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { workspace } = useCurrentWorkspace();

  const config = [
    {
      label: 'Logo',
      content: (
        <Avatar
          size="lg"
          borderRadius="md"
          alt="workspace_image"
          name={workspace?.name}
          src={workspace?.imageUrl ?? ''}
          fontWeight="semibold"
        ></Avatar>
      ),
    },
    {
      label: 'Workspace name',
      content: <Text fontWeight="semibold">{workspace?.name}</Text>,
    },
  ];

  return (
    <Card px={0} spacing={6}>
      <Heading px={4} as="h4" size="md">
        Workspace info
      </Heading>
      {isEditing ? (
        <EditWorkspaceInfoForm
          workspaceData={workspace}
          onSubmit={() => {
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <DataList config={config} />
          <Stack direction={{ base: 'column', md: 'row' }} px={4} spacing={4} variant="solid">
            <Button
              iconSpacing="1"
              onClick={() => {
                setIsEditing(true);
              }}
              leftIcon={<FiEdit />}
            >
              Edit Workspace Info
            </Button>
          </Stack>
        </>
      )}
    </Card>
  );
};

export default WorkspaceInformation;
