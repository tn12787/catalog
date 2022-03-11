import { Stack, Flex, Button, Image, HStack, Text, ButtonGroup } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Controller, useForm } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';
import { TaskStatus } from '@prisma/client';
import { format } from 'date-fns';

import { buildWizardArtworkConfig } from '../EditArtworkForm/artworkConfig';
import { EditArtworkFormData } from '../../specific/tasks/Artwork/types';

import FormContent from 'components/forms/FormContent';
import { ReleaseWizardComponentProps } from 'components/releases/NewReleaseWizard/types';
import ImageDropper from 'components/images/ImageDropper';
import useAppColors from 'hooks/useAppColors';
import { uploadImageToFirebase } from 'queries/artwork';
import { defaultTaskDueDate } from 'utils/tasks';

const WizardArtworkFormBody = ({
  onSubmit,
  isSkippable,
  onSkip,
  loading,
  canGoBack,
  onBack,
  completeState,
}: ReleaseWizardComponentProps<EditArtworkFormData>) => {
  const [showForm, setShowForm] = useState(completeState?.artwork?.status !== TaskStatus.COMPLETE);
  const [uploading, setUploading] = useState(false);
  const { bodySub } = useAppColors();

  const properDateFormat = useMemo(() => {
    const existingDate = completeState?.artwork?.dueDate ?? defaultTaskDueDate();
    return format(new Date(existingDate), 'yyyy-MM-dd');
  }, [completeState?.artwork?.dueDate]);

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<EditArtworkFormData>({
    shouldUnregister: false,
    defaultValues: {
      ...completeState?.artwork,
      dueDate: properDateFormat as unknown as Date,
    },
  });

  const watchedAlbumArt = watch('artworkData');
  const watchedArtUrl = watch('url');

  const onSubmitFn = async (data: EditArtworkFormData) => {
    const { artworkData, ...rest } = data;
    setUploading(true);
    const url: string = await uploadImageToFirebase(artworkData as File, undefined, 'artwork');
    setUploading(false);

    onSubmit({ ...rest, url: url ?? completeState?.artwork?.url });
  };

  useEffect(() => {
    const newStatus =
      watchedAlbumArt || watchedArtUrl ? TaskStatus.COMPLETE : TaskStatus.OUTSTANDING;
    if (completeState?.artwork) {
      reset({
        ...completeState?.artwork,
        status: newStatus,
        url: watchedArtUrl,
        artworkData: watchedAlbumArt,
        dueDate: properDateFormat as unknown as Date,
      });
    } else {
      setValue('status', newStatus);
    }
  }, [setValue, watchedAlbumArt, watchedArtUrl, properDateFormat, completeState?.artwork, reset]);

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmitFn)} width="100%">
      <Stack width="100%" maxW="600px" margin="0 auto">
        {showForm ? (
          <Stack>
            <FormContent
              control={control}
              config={buildWizardArtworkConfig(completeState?.basics?.targetDate as Date)}
              errors={errors}
              register={register}
            />
            <HStack fontSize="sm">
              <Text color={bodySub}>Already have artwork?</Text>
              <Button
                onClick={() => {
                  reset({
                    dueDate: properDateFormat as unknown as Date,
                  });
                  setShowForm(false);
                }}
                colorScheme="purple"
                fontWeight="normal"
                variant="link"
                size="sm"
              >
                Upload it instead.
              </Button>
            </HStack>
          </Stack>
        ) : watchedAlbumArt || watchedArtUrl ? (
          <Stack>
            <Image
              borderRadius="5px"
              width="100%"
              height="600px"
              objectFit="cover"
              alt="completed artwork"
              src={
                watchedAlbumArt ? URL.createObjectURL(watchedAlbumArt as Blob) : watchedArtUrl || ''
              }
            />
            <Button
              onClick={() => {
                setValue('artworkData', undefined);
                setValue('url', null);
              }}
              colorScheme="purple"
              fontWeight="normal"
              variant="link"
            >
              Choose another picture
            </Button>
          </Stack>
        ) : (
          <Stack>
            <Controller
              render={({ field }: any) => (
                <ImageDropper
                  containerProps={{ h: '400px' }}
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  onDrop={(files) => field.onChange(files[0])}
                  accept={'image/jpeg, image/png'}
                />
              )}
              name={'artworkData'}
              control={control}
            />
            <Button
              onClick={() => setShowForm(true)}
              colorScheme="purple"
              fontWeight="normal"
              variant="link"
            >
              {'Enter task info instead'}
            </Button>
          </Stack>
        )}
        <HStack justify="space-between">
          <Flex>
            {canGoBack && (
              <Button variant="link" onClick={onBack} leftIcon={<BiArrowBack />}>
                Back
              </Button>
            )}
          </Flex>
          <ButtonGroup>
            {isSkippable && (
              <Button
                colorScheme="purple"
                variant="ghost"
                flexGrow={0}
                onClick={() => onSkip?.('artwork')}
              >
                Skip
              </Button>
            )}
            <Button
              colorScheme="purple"
              flexGrow={0}
              rightIcon={<FiArrowRight />}
              isLoading={loading || uploading}
              type="submit"
            >
              Next
            </Button>
          </ButtonGroup>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default WizardArtworkFormBody;
