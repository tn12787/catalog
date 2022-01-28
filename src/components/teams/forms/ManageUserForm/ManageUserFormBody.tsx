import { Stack, Button, ButtonGroup, HStack } from '@chakra-ui/react';
import React from 'react';
import { FiSave, FiSend } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import { useQuery } from 'react-query';

import { buildManageUserConfig } from './manageUserConfig';

import FormContent from 'components/forms/FormContent';
import { FormBodyProps } from 'types/forms';
import { fetchRoles } from 'queries/roles';
import { TeamMemberWithUserAndRoles } from 'types/common';

interface ManageUserFormBodyProps<T> extends FormBodyProps<T> {
  existingData: T;
}

const ManageUserForm = ({
  onSubmit,
  loading,
  existingData,
}: ManageUserFormBodyProps<TeamMemberWithUserAndRoles>) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<TeamMemberWithUserAndRoles>({ defaultValues: { roles: existingData.roles } });

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack spacing={3} width="100%" maxW="600px" margin="0 auto">
        <FormContent
          config={buildManageUserConfig()}
          control={control}
          errors={errors}
          register={register}
        />
        <HStack justify="flex-end">
          <ButtonGroup>
            <Button
              colorScheme="purple"
              flexGrow={0}
              rightIcon={<FiSave />}
              isLoading={loading}
              type="submit"
            >
              Save
            </Button>
          </ButtonGroup>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default ManageUserForm;
