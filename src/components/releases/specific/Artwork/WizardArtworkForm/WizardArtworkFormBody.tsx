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
import { FiArrowRight, FiSave } from 'react-icons/fi';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { BiArrowBack } from 'react-icons/bi';

import { buildArtworkConfig, buildNewArtworkConfig } from '../artworkConfig';
import { EditArtworkFormData } from '../types';

import FormContent from 'components/FormContent';
import { FormBodyProps } from 'components/releases/NewReleaseWizard/types';
import ImageDropzone from 'components/ImageDropper';
import useAppColors from 'hooks/useAppColors';

const WizardArtworkFormBody = ({
  onSubmit,
  isSkippable,
  onSkip,
  existingRelease,
  loading,
  canGoBack,
  onBack,
}: FormBodyProps<EditArtworkFormData>) => {
  const [showForm, setShowForm] = useState(true);

  const { bodySub } = useAppColors();

  const formattedDueDate = useMemo(
    () => dayjs(existingRelease?.artwork?.dueDate).format('YYYY-MM-DD'),
    [existingRelease?.artwork?.dueDate]
  );

  const formattedCompletedOn = useMemo(
    () =>
      existingRelease?.artwork?.completedOn
        ? dayjs(existingRelease?.artwork?.completedOn).format('YYYY-MM-DD')
        : undefined,
    [existingRelease?.artwork?.completedOn]
  );

  const { register, errors, control, handleSubmit, watch, reset } =
    useForm<EditArtworkFormData>({
      shouldUnregister: false,
      defaultValues: existingRelease?.artwork
        ? {
            ...existingRelease?.artwork,
            dueDate: formattedDueDate,
            completedOn: formattedCompletedOn,
          }
        : {},
    });

  const watchedAlbumArt = watch('artworkData');

  console.log(watchedAlbumArt);

  useEffect(() => {
    reset({
      ...existingRelease?.artwork,
      dueDate: formattedDueDate,
      completedOn: formattedCompletedOn,
    });
  }, [existingRelease?.artwork, formattedDueDate, formattedCompletedOn, reset]);

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
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
        ) : watchedAlbumArt ? (
          <Stack>
            <Image
              borderRadius="5px"
              width="100%"
              height="600px"
              objectFit="cover"
              alt="completed artwork"
              src={watchedAlbumArt && URL.createObjectURL(watchedAlbumArt)}
            />
            <Button
              onClick={() => reset({ artworkData: null })}
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
                onClick={onSkip}
              >
                Skip
              </Button>
            )}
            <Button
              colorScheme="purple"
              flexGrow={0}
              rightIcon={<FiArrowRight />}
              isLoading={loading}
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
