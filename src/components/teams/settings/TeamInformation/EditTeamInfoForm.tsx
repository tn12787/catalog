import { Stack, Button, Image, HStack } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit, FiSave } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';
import { Team } from '@prisma/client';

import FormField from 'components/forms/FormContent/FormField';
import DataList from 'components/DataList';
import { updateSingleTeam } from 'queries/teams';
import ImageSelect from 'components/forms/QuickForm/ImageField/ImageSelect';

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
  teamData?: Team;
}

type EditTeamInfoFormData = Pick<Team, 'name' | 'imageUrl'>;

const EditTeamInfoForm = ({ onSubmit, onCancel, teamData }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditTeamInfoFormData>({
    defaultValues: { name: teamData?.name, imageUrl: teamData?.imageUrl },
  });

  const currentImage = watch('imageUrl');

  const onImageChange = (url: string) => {
    setValue('imageUrl', url);
  };

  const config = [
    {
      label: 'Logo',
      content: (
        <HStack>
          {currentImage && (
            <Image boxSize={'75px'} borderRadius="md" src={currentImage} alt="team image" />
          )}
          <ImageSelect
            message="Choose"
            fontWeight="semibold"
            onChange={onImageChange}
          ></ImageSelect>
        </HStack>
      ),
    },
    {
      label: 'Team name',
      content: (
        <FormField
          register={register}
          errors={errors}
          showLabel={false}
          control={control}
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
      queryClient.invalidateQueries(['me']);
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
