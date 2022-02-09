import React, { useState } from 'react';
import { Heading, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { FiEdit } from 'react-icons/fi';
import { Avatar } from '@chakra-ui/react';

import EditTeamInfoForm from './EditTeamInfoForm';

import Card from 'components/Card';
import DataList from 'components/DataList';
import useCurrentTeam from 'hooks/data/team/useCurrentTeam';

const TeamInformation = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { team } = useCurrentTeam();

  const config = [
    {
      label: 'Logo',
      content: (
        <Avatar
          size="lg"
          borderRadius="md"
          alt="team_image"
          name={team?.name}
          src={team?.imageUrl ?? ''}
          fontWeight="semibold"
        ></Avatar>
      ),
    },
    {
      label: 'Team name',
      content: <Text fontWeight="semibold">{team?.name}</Text>,
    },
  ];

  return (
    <Card px={0} spacing={6}>
      <Heading px={4} as="h4" size="md">
        Team info
      </Heading>
      {isEditing ? (
        <EditTeamInfoForm
          teamData={team}
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
              Edit Team Info
            </Button>
          </Stack>
        </>
      )}
    </Card>
  );
};

export default TeamInformation;
