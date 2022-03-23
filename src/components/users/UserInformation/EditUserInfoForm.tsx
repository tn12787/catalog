import { Stack, Button, Avatar, Switch } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit, FiSave } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';

import FormField from 'components/forms/FormContent/FormField';
import DataList from 'components/data/DataList';
import { updateSingleUser } from 'queries/me';
import ImageSelect from 'components/forms/QuickForm/ImageField/ImageSelect';
import { UserResponse } from 'types/common';

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
  userData?: UserResponse;
}

type EditUserFormData = Pick<UserResponse, 'name' | 'image' | 'emailPreferences'>;

const EditUserInfoForm = ({ onSubmit, onCancel, userData }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EditUserFormData>({
    defaultValues: {
      name: userData?.name as string,
      image: userData?.image as string,
      emailPreferences: userData?.emailPreferences ?? { reminders: true },
    },
  });

  const currentImage = watch('image');

  const onImageChange = (url: string) => {
    setValue('image', url);
  };

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
    {
      label: 'Profile Image',
      content: (
        <Stack
          alignItems={{ base: 'flex-start', md: 'center' }}
          direction={{ base: 'column', md: 'row' }}
        >
          {currentImage && (
            <Avatar
              size="lg"
              borderRadius="md"
              alt="user image"
              src={currentImage}
              fontWeight="semibold"
            ></Avatar>
          )}
          <ImageSelect
            message="Choose"
            fontWeight="semibold"
            onChange={onImageChange}
            filePath="profilePictures"
            entityId={userData?.id}
          ></ImageSelect>
        </Stack>
      ),
    },
    {
      label: 'Email Notifications',
      content: (
        <FormField
          register={register}
          errors={errors}
          showLabel={false}
          name={'emailPreferences.reminders' as keyof EditUserFormData}
          CustomComponent={({ onChange, value }) => {
            return <Switch colorScheme="purple" isChecked={!!value} onChange={onChange} />;
          }}
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
      await updateMe({
        id: userData?.id as string,
        ...data,
      });

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
