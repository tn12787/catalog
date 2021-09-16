import { Stack, Flex, Button, Image, HStack } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { TaskStatus } from '@prisma/client';

import { buildArtworkConfig } from '../artworkConfig';
import { EditArtworkFormData } from '../types';

import FormContent from 'components/FormContent';
import Card from 'components/Card';
import { FormBodyProps } from 'components/releases/NewReleaseWizard/types';

const EditArtworkFormBody = ({
  onSubmit,
  isSkippable,
  onSkip,
  existingRelease,
  loading,
}: FormBodyProps<EditArtworkFormData>) => {
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

  const { register, errors, handleSubmit, watch, reset } =
    useForm<EditArtworkFormData>({
      defaultValues: existingRelease?.artwork
        ? {
            ...existingRelease?.artwork,
            dueDate: formattedDueDate,
            completedOn: formattedCompletedOn,
          }
        : {},
    });

  const status = watch('status');
  const watchedAlbumArt = watch('artworkData');

  useEffect(() => {
    reset({
      ...existingRelease?.artwork,
      dueDate: formattedDueDate,
      completedOn: formattedCompletedOn,
    });
  }, [existingRelease?.artwork, formattedDueDate, formattedCompletedOn, reset]);

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Card width="100%">
        <Stack py={6} spacing={6} width="100%" maxW="600px" margin="0 auto">
          {status === TaskStatus.COMPLETE &&
            (existingRelease?.artwork?.url || watchedAlbumArt?.length) && (
              <Image
                borderRadius="5px"
                width="100%"
                height="500px"
                objectFit="cover"
                alt="completed artwork"
                src={
                  watchedAlbumArt?.length
                    ? URL.createObjectURL(watchedAlbumArt[0])
                    : existingRelease?.artwork?.url
                }
              />
            )}
          <FormContent
            config={buildArtworkConfig(status === TaskStatus.COMPLETE)}
            errors={errors}
            register={register}
          />
          <HStack justify="space-between">
            <Flex>
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
            </Flex>
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
      </Card>
    </Stack>
  );
};

export default EditArtworkFormBody;
