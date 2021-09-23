import React, { useState } from 'react';
import { Team } from '@prisma/client';
import { Heading, HStack, Stack, Text } from '@chakra-ui/layout';
import { ButtonGroup, Button } from '@chakra-ui/button';
import { RiAddFill, RiArrowRightUpLine, RiEdit2Fill } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { BiRocket } from 'react-icons/bi';

import EditTeamInfoForm from './EditTeamInfoForm';

import Card from 'components/Card';
import useAppColors from 'hooks/useAppColors';
import DataList from 'components/DataList';

interface Props {
  team?: Team;
  loading?: boolean;
}

const TeamInformation = ({ team, loading }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const config = [
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
          <Stack
            direction={{ base: 'column', md: 'row' }}
            px={4}
            spacing={4}
            variant="solid"
          >
            <Button
              colorScheme="purple"
              iconSpacing="1"
              leftIcon={<BiRocket />}
            >
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
