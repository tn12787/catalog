import { Stack, Flex, Button, Image, HStack } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { TaskStatus } from '@prisma/client';
import { format } from 'date-fns';

import { EditArtworkFormData } from '../../specific/tasks/Artwork/types';

import { buildArtworkConfig } from './artworkConfig';

import FormContent from 'components/forms/FormContent';
import { ReleaseWizardComponentProps } from 'components/releases/NewReleaseWizard/types';

const EditArtworkFormBody = ({
  onSubmit,
  existingRelease,
  loading,
}: ReleaseWizardComponentProps<EditArtworkFormData>) => {
  const formattedDueDate = useMemo(
    () => format(new Date(existingRelease?.artwork?.dueDate ?? Date.now()), 'yyyy-MM-dd'),
    [existingRelease?.artwork?.dueDate]
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
    reset,
  } = useForm<EditArtworkFormData>({
    defaultValues: existingRelease?.artwork
      ? {
          ...existingRelease?.artwork,
          dueDate: formattedDueDate,
        }
      : { assignees: [] },
  });

  const status = watch('status');
  const watchedAlbumArt = watch('artworkData');

  useEffect(() => {
    reset({
      ...existingRelease?.artwork,
      dueDate: formattedDueDate,
    });
  }, [existingRelease?.artwork, formattedDueDate, reset]);

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack py={6} spacing={6} width="100%" maxW="600px" margin="0 auto">
        {status === TaskStatus.COMPLETE &&
          (existingRelease?.artwork?.url || (watchedAlbumArt as File[])?.length) && (
            <Image
              borderRadius="5px"
              width="100%"
              aspectRatio={1}
              objectFit="cover"
              alt="completed artwork"
              src={
                (watchedAlbumArt as File[])?.length
                  ? URL.createObjectURL((watchedAlbumArt as File[])[0])
                  : existingRelease?.artwork?.url || ''
              }
            />
          )}
        <FormContent
          config={buildArtworkConfig(status === TaskStatus.COMPLETE)}
          errors={errors}
          control={control}
          register={register}
        />
        <HStack justify="space-between">
          <Flex></Flex>
          <Button
            colorScheme="purple"
            flexGrow={0}
            rightIcon={<FiSave />}
            isLoading={loading}
            type="submit"
          >
            Save
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default EditArtworkFormBody;
