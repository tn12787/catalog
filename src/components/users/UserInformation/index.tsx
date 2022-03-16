import React, { useState } from 'react';
import { User } from '@prisma/client';
import { Heading, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { FiEdit } from 'react-icons/fi';
import { Avatar } from '@chakra-ui/react';

import EditUserInfoForm from './EditUserInfoForm';

import Card from 'components/Card';
import DataList from 'components/data/DataList';

interface Props {
  user?: User;
  loading?: boolean;
}

const UserInformation = ({ user }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const config = [
    {
      label: 'Name',
      content: <Text fontWeight="semibold">{user?.name}</Text>,
    },
    {
      label: 'Profile image',
      content: (
        <Avatar
          size="lg"
          borderRadius="md"
          alt="user image"
          src={user?.image ?? ''}
          fontWeight="semibold"
        ></Avatar>
      ),
    },
    {
      label: 'Email Notifications',
      content: <Text fontWeight="semibold">{user?.receiveEmail ? 'On' : 'Off'}</Text>,
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
          <Stack direction={{ base: 'column', md: 'row' }} px={4} spacing={4} variant="solid">
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
