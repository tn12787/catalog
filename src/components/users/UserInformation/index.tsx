import React, { useState } from 'react';
import { Team, User } from '@prisma/client';
import { Heading, HStack, Stack, Text } from '@chakra-ui/layout';
import { ButtonGroup, Button } from '@chakra-ui/button';
import { RiAddFill, RiArrowRightUpLine, RiEdit2Fill } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { BiRocket } from 'react-icons/bi';

import EditUserInfoForm from './EditUserInfoForm';

import Card from 'components/Card';
import useAppColors from 'hooks/useAppColors';
import DataList from 'components/DataList';

interface Props {
  user?: User;
  loading?: boolean;
}

const UserInformation = ({ user, loading }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const config = [
    {
      label: 'Name',
      content: <Text fontWeight="semibold">{user?.name}</Text>,
    },
  ];

  return (
    <Card px={0} spacing={6}>
      <Heading px={4} as="h4" size="md">
        User info
      </Heading>
      {isEditing ? (
        <EditUserInfoForm
          userData={user}
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
              iconSpacing="1"
              onClick={() => {
                setIsEditing(true);
              }}
              leftIcon={<FiEdit />}
            >
              Edit User Info
            </Button>
          </Stack>
        </>
      )}
    </Card>
  );
};

export default UserInformation;
