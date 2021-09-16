import { Stack, Flex, Button, Image } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { Artwork, TaskStatus } from '@prisma/client';

import { buildArtworkConfig } from '../artworkConfig';
import { EditArtworkFormData } from '../types';

import FormContent from 'components/FormContent';
import Card from 'components/Card';
import { EnrichedRelease } from 'types';
import useExtendedSession from 'hooks/useExtendedSession';

interface Props {
  onSubmit: (data: EditArtworkFormData) => void;
  existingRelease?: EnrichedRelease;
  loading?: boolean;
}

const EditArtworkFormBody = ({ onSubmit, existingRelease, loading }: Props) => {
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
          <Flex justify="flex-end">
            <Button
              colorScheme="purple"
              flexGrow={0}
              rightIcon={<FiSave />}
              isLoading={loading}
              type="submit"
            >
              Save
            </Button>
          </Flex>
        </Stack>
      </Card>
    </Stack>
  );
};

export default EditArtworkFormBody;
