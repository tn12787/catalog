import {
  Stack,
  Flex,
  Button,
  Image,
  HStack,
  Text,
  ButtonGroup,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Controller, useForm } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';

import { buildNewArtworkConfig } from '../artworkConfig';
import { EditArtworkFormData } from '../types';

import FormContent from 'components/FormContent';
import { ReleaseWizardComponentProps } from 'components/releases/NewReleaseWizard/types';
import ImageDropzone from 'components/ImageDropper';
import useAppColors from 'hooks/useAppColors';
import { TaskStatus } from '.prisma/client';
import { uploadImageToFirebase } from 'queries/artwork';

const WizardArtworkFormBody = ({
  onSubmit,
  isSkippable,
  onSkip,
  loading,
  canGoBack,
  onBack,
  completeState,
}: ReleaseWizardComponentProps<EditArtworkFormData>) => {
  const [showForm, setShowForm] = useState(
    completeState?.artwork?.status !== TaskStatus.COMPLETE
  );
  const [uploading, setUploading] = useState(false);
  const { bodySub } = useAppColors();

  const { register, errors, control, handleSubmit, setValue, watch, reset } =
    useForm<EditArtworkFormData>({
      shouldUnregister: false,
    });

  const watchedAlbumArt = watch('artworkData');

  const onSubmitFn = async (data: EditArtworkFormData) => {
    const { artworkData, ...rest } = data;
    setUploading(true);
    const url: string = await uploadImageToFirebase(artworkData as File);
    setUploading(false);

    onSubmit({ ...rest, url: url ?? completeState?.artwork?.url });
  };

  console.log(completeState?.artwork);

  useEffect(() => {
    const newStatus =
      watchedAlbumArt || completeState?.artwork?.url
        ? TaskStatus.COMPLETE
        : TaskStatus.OUTSTANDING;
    if (completeState?.artwork) {
      reset({ ...completeState?.artwork, status: newStatus });
    } else {
      setValue('status', newStatus);
    }
  }, [setValue, watchedAlbumArt, completeState?.artwork, reset]);

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmitFn)} width="100%">
      <Stack py={6} spacing={6} width="100%" maxW="600px" margin="0 auto">
        {showForm ? (
          <Stack>
            <FormContent
              config={buildNewArtworkConfig()}
              errors={errors}
              register={register}
            />
            <HStack fontSize="sm">
              <Text color={bodySub}>Already have artwork?</Text>
              <Button
                onClick={() => {
                  reset({});
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
        ) : watchedAlbumArt || completeState?.artwork?.url ? (
          <Stack>
            <Image
              borderRadius="5px"
              width="100%"
              height="600px"
              objectFit="cover"
              alt="completed artwork"
              src={
                watchedAlbumArt
                  ? URL.createObjectURL(watchedAlbumArt)
                  : completeState?.artwork?.url
              }
            />
            <Button
              onClick={() => reset({ artworkData: undefined })}
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
              render={({ onChange }) => (
                <ImageDropzone
                  onChange={(e) => onChange(e.target.files?.[0])}
                  onDrop={(files) => onChange(files[0])}
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
              <Button
                variant="link"
                onClick={onBack}
                leftIcon={<BiArrowBack />}
              >
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
