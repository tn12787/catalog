import { Stack, Flex, Button, Image, HStack } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { TaskStatus } from '@prisma/client';

import { EditArtworkFormData } from '../../specific/Artwork/types';

import { buildArtworkConfig } from './artworkConfig';

import FormContent from 'components/forms/FormContent';
import Card from 'components/Card';
import { ReleaseWizardComponentProps } from 'components/releases/NewReleaseWizard/types';

const EditArtworkFormBody = ({
  onSubmit,
  isSkippable,
  onSkip,
  existingRelease,
  loading,
}: ReleaseWizardComponentProps<EditArtworkFormData>) => {
  const formattedDueDate = useMemo(
    () => dayjs(existingRelease?.artwork?.dueDate).format('YYYY-MM-DD'),
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
      : {},
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
                  : existingRelease?.artwork?.url
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
