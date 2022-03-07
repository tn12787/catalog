import { Stack, Button, Image } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit, FiSave } from 'react-icons/fi';
import { Workspace } from '@prisma/client';

import FormField from 'components/forms/FormContent/FormField';
import DataList from 'components/data/DataList';
import ImageSelect from 'components/forms/QuickForm/ImageField/ImageSelect';
import useWorkspaceMutations from 'hooks/data/workspaces/useWorkspaceMutations';

interface Props {
  onSubmit: () => void;
  onCancel: () => void;
  workspaceData?: Workspace;
}

type EditWorkspaceInfoFormData = Pick<Workspace, 'name' | 'imageUrl'>;

const EditWorkspaceInfoForm = ({ onSubmit, onCancel, workspaceData: workspaceData }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditWorkspaceInfoFormData>({
    defaultValues: { name: workspaceData?.name, imageUrl: workspaceData?.imageUrl },
  });

  const currentImage = watch('imageUrl');

  const onImageChange = (url: string) => {
    setValue('imageUrl', url);
  };

  const config = [
    {
      label: 'Logo',
      content: (
        <Stack
          alignItems={{ base: 'flex-start', md: 'center' }}
          direction={{ base: 'column', md: 'row' }}
        >
          {currentImage && (
            <Image
              boxSize={{ base: '75px', md: '75px' }}
              borderRadius="md"
              src={currentImage}
              alt="workspace image"
            />
          )}
          <ImageSelect
            message="Choose"
            fontWeight="semibold"
            onChange={onImageChange}
            filePath="logos"
            entityId={workspaceData?.id}
          ></ImageSelect>
        </Stack>
      ),
    },
    {
      label: 'Workspace name',
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

  const {
    updateSingleWorkspace: { mutateAsync: updateWorkspace, isLoading },
  } = useWorkspaceMutations();

  const onSave = async (data: EditWorkspaceInfoFormData) => {
    try {
      await updateWorkspace({ id: workspaceData?.id as string, ...data });

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

export default EditWorkspaceInfoForm;
