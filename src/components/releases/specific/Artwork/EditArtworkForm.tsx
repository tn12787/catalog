import {
  Flex,
  Stack,
  Button,
  Text,
  useToast,
  Heading,
  Image,
} from '@chakra-ui/react';
import Card from 'components/Card';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';
import { Artwork, EnrichedRelease } from 'types';
import { buildArtworkConfig } from 'components/releases/specific/Artwork/artworkConfig';
import FormContent from 'components/FormContent';
import 'firebase/storage';
import withReleaseData from 'HOCs/withReleaseData';
import { useRouter } from 'next/router';
import BackButton from 'components/BackButton';
import { TaskStatus } from '.prisma/client';
import {
  createSingleArtwork,
  updateSingleArtwork,
  uploadImageToFirebase,
} from 'queries/artwork';
import { useQueryClient, useMutation } from 'react-query';
import { EditArtworkFormData } from './types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: EnrichedRelease;
}

const EditArtworkForm = ({ releaseData }: Props) => {
  const router = useRouter();

  const formattedDueDate = useMemo(
    () => dayjs(releaseData.artwork?.dueDate).format('YYYY-MM-DD'),
    [releaseData.artwork?.dueDate]
  );

  const formattedCompletedOn = useMemo(
    () =>
      releaseData.artwork?.completedOn
        ? dayjs(releaseData.artwork?.completedOn).format('YYYY-MM-DD')
        : undefined,
    [releaseData.artwork?.completedOn]
  );

  const { register, errors, handleSubmit, watch, reset } = useForm<Artwork>({
    defaultValues: releaseData.artwork
      ? {
          ...releaseData.artwork,
          dueDate: formattedDueDate,
          completedOn: formattedCompletedOn,
        }
      : {},
  });

  const toast = useToast();

  const queryClient = useQueryClient();

  const { mutateAsync: createArtwork, isLoading: createLoading } = useMutation(
    createSingleArtwork,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases']);
      },
    }
  );

  const { mutateAsync: updateArtwork, isLoading: updateLoading } = useMutation(
    updateSingleArtwork,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases']);
      },
    }
  );

  const onCreate = async (data: EditArtworkFormData) => {
    try {
      const url = await uploadImageToFirebase(
        releaseData.id,
        data.artworkData?.[0]
      );
      await createArtwork({
        ...data,
        url,
        releaseId: releaseData.id,
      });

      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      router.push(`/releases/${releaseData.id}`);
    } catch (e: any) {
      console.log(e);
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    }
  };

  const onUpdate = async (data: EditArtworkFormData) => {
    try {
      const url = await uploadImageToFirebase(
        releaseData.id,
        data.artworkData?.[0]
      );

      await updateArtwork({
        ...data,
        url,
        releaseId: releaseData.id,
      });

      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      router.push(`/releases/${releaseData.id}`);
    } catch (e: any) {
      console.log(e);
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    } finally {
    }
  };

  const status = watch('status');
  const watchedAlbumArt = watch('artworkData');

  useEffect(() => {
    reset({
      ...releaseData.artwork,
      dueDate: formattedDueDate,
      completedOn: formattedCompletedOn,
    });
  }, [releaseData.artwork, formattedDueDate, formattedCompletedOn, reset]);

  return (
    <Stack
      flex={1}
      bg="#eee"
      align="center"
      direction="column"
      width="100%"
      height="100%"
    >
      <Stack py={8} spacing={3} width="90%" maxW="900px">
        <BackButton
          alignSelf="flex-start"
          href={`/releases/${releaseData.id}`}
        />
        <Heading>Artwork</Heading>
        <Text>Edit your artwork task and tracking the status</Text>
        <Stack
          as="form"
          onSubmit={handleSubmit(releaseData.artwork ? onUpdate : onCreate)}
          width="100%"
        >
          <Card width="100%">
            <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
              {status === TaskStatus.COMPLETE &&
                (releaseData.artwork?.url || watchedAlbumArt?.length) && (
                  <Image
                    borderRadius="5px"
                    width="100%"
                    height="500px"
                    objectFit="cover"
                    alt="completed artwork"
                    src={
                      watchedAlbumArt?.length
                        ? URL.createObjectURL(watchedAlbumArt[0])
                        : releaseData.artwork?.url
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
                  colorScheme="blue"
                  flexGrow={0}
                  rightIcon={<FiSave />}
                  isLoading={createLoading || updateLoading}
                  type="submit"
                >
                  Save
                </Button>
              </Flex>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withReleaseData(EditArtworkForm);
