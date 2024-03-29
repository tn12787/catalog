import { Stack, Button, ButtonGroup, HStack } from '@chakra-ui/react';
import React from 'react';
import { FiSend } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import { useQuery } from 'react-query';

import { buildInviteUserConfig } from './inviteUserConfig';

import FormContent from 'components/forms/FormContent';
import { FormBodyProps } from 'types/forms';
import { fetchRoles } from 'queries/roles';

const InviteUserFormBody = ({ onSubmit, loading }: FormBodyProps<User & { role: string }>) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<User & { role: string }>();

  const { data: allRoles } = useQuery(['roles'], fetchRoles);

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack spacing={6} width="100%" maxW="600px" margin="0 auto">
        <FormContent
          config={buildInviteUserConfig(allRoles ?? [])}
          control={control}
          errors={errors}
          register={register}
        />
        <HStack justify="flex-end">
          <ButtonGroup>
            <Button
              colorScheme="purple"
              flexGrow={0}
              rightIcon={<FiSend />}
              isLoading={loading}
              type="submit"
            >
              Send invite
            </Button>
          </ButtonGroup>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default InviteUserFormBody;
