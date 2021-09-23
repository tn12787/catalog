import { Stack, Button, Input } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BiRocket } from 'react-icons/bi';
import { FiEdit, FiSave } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';
import { getSession } from 'next-auth/react';

import FormField from 'components/FormContent/FormField';
import DataList from 'components/DataList';
import { Team } from '.prisma/client';
import { updateSingleTeam } from 'queries/teams';

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
  teamData?: Team;
}

interface EditTeamInfoFormData {
  name: string;
}

const EditTeamInfoForm = ({ onSubmit, onCancel, teamData }: Props) => {
  const { register, handleSubmit, errors } = useForm<EditTeamInfoFormData>({
    defaultValues: { name: teamData?.name },
  });

  const config = [
    {
      label: 'Team name',
      content: (
        <FormField
          register={register}
          errors={errors}
          showLabel={false}
          name="name"
          type="text"
        />
      ),
    },
  ];

  const queryClient = useQueryClient();

  const { mutateAsync: updateTeam, isLoading } = useMutation(updateSingleTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries(['team', teamData?.id]);
    },
  });

  const onSave = async (data: EditTeamInfoFormData) => {
    try {
      await updateTeam({ id: teamData?.id as string, ...data });

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

export default EditTeamInfoForm;
