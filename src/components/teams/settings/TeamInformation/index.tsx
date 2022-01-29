import React, { useState } from 'react';
import { Team } from '@prisma/client';
import { Heading, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { FiEdit } from 'react-icons/fi';
import { BiRocket } from 'react-icons/bi';
import { Avatar, Image } from '@chakra-ui/react';

import EditTeamInfoForm from './EditTeamInfoForm';

import Card from 'components/Card';
import DataList from 'components/DataList';

interface Props {
  team?: Team;
  loading?: boolean;
}

const TeamInformation = ({ team }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const config = [
    {
      label: 'Logo',
      content: (
        <Image
          boxSize="75px"
          borderRadius="md"
          alt="team_image"
          name={team?.name}
          src={team?.imageUrl ?? ''}
          fontWeight="semibold"
        ></Image>
      ),
    },
    {
      label: 'Team name',
      content: <Text fontWeight="semibold">{team?.name}</Text>,
    },
    {
      label: 'Current Plan',
      content: <Text fontWeight="semibold">{team?.plan}</Text>,
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
            <Button colorScheme="purple" iconSpacing="1" leftIcon={<BiRocket />}>
              Change Plan
            </Button>
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
