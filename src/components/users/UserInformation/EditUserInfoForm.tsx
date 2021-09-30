import { Stack, Button, Input } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit, FiSave } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';

import FormField from 'components/forms/FormContent/FormField';
import DataList from 'components/DataList';
import { User } from '.prisma/client';
import { updateSingleTeam } from 'queries/teams';
import { updateSingleUser } from 'queries/me';

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
  userData?: User;
}

interface EditUserFormData {
  name: string;
}

const EditUserInfoForm = ({ onSubmit, onCancel, userData }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditUserFormData>({
    defaultValues: { name: userData?.name as string },
  });

  const config = [
    {
      label: 'Name',
      content: (
        <FormField
          register={register}
          errors={errors}
          showLabel={false}
          name="name"
          type="text"
          control={control}
        />
      ),
    },
  ];

  const queryClient = useQueryClient();

  const { mutateAsync: updateMe, isLoading } = useMutation(updateSingleUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
    },
  });

  const onSave = async (data: EditUserFormData) => {
    try {
      await updateMe({ id: userData?.id as string, ...data });

      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack>
      <DataList config={config} />
      <Stack
        direction={{ base: 'column', md: 'row' }}
        px={4}
        spacing={4}
        as="form"
        onSubmit={handleSubmit(onSave)}
      >
        <Button
          colorScheme="purple"
          type="submit"
          iconSpacing="1"
          isLoading={isLoading}
          leftIcon={<FiSave />}
        >
          Save
        </Button>
        <Button iconSpacing="1" onClick={onCancel} leftIcon={<FiEdit />}>
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditUserInfoForm;
