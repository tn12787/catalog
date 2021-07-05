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
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';
import { Artwork, Release, ReleaseTaskType } from 'types';
import { buildArtworkConfig } from '../../../../data/releases/artwork/artworkConfig';
import { useFirestore, useFirestoreDocData, useStorage } from 'reactfire';
import FormContent from 'components/FormContent';
import 'firebase/storage';
import { useRef } from 'react';
import { createOrUpdateCalendarEventForReleaseTask } from 'events/calendars/google';
import withReleaseData from 'HOCs/withReleaseData';
import { useRouter } from 'next/router';
import BackButton from 'components/BackButton';

interface Props {
  releaseData: Release;
}

const EditArtwork = ({ releaseData }: Props) => {
  const router = useRouter();
  const artworkRef = useRef(
    useFirestore().collection('artwork').doc(releaseData.artwork)
  ); // TODO: What if this is null here?

  const releaseId = releaseData.id;
  const releaseRef = useFirestore().collection('releases').doc(releaseData.id);

  const { data: existingArtwork } = useFirestoreDocData<Artwork>(
    artworkRef.current,
    {
      idField: 'id',
    }
  );

  const storageRef = useStorage().ref('images/');

  const { register, errors, handleSubmit, watch } = useForm<Artwork>({
    defaultValues: existingArtwork,
  });

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const onSubmit = async (data: Artwork) => {
    try {
      setLoading(true);

      const { albumArt, ...rest } = data;
      if (albumArt?.length) {
        const artworkFileRef = storageRef.child(artworkRef.current.id);
        await artworkFileRef.put(albumArt[0], { contentType: 'image/jpeg' });
        const downloadURL = await artworkFileRef.getDownloadURL();
        await artworkRef.current.set(
          { ...rest, url: downloadURL, release: releaseId },
          { merge: true }
        );
      } else {
        await artworkRef.current.set(
          { ...rest, release: releaseId },
          { merge: true }
        );
      }

      await releaseRef.set({ artwork: artworkRef.current.id }, { merge: true });

      await createOrUpdateCalendarEventForReleaseTask(
        data,
        releaseData.name,
        ReleaseTaskType.ARTWORK,
        artworkRef.current,
        existingArtwork.calendarEventId
      );

      toast({
        status: 'success',
        title: 'Success',
        description: 'Changes to artwork saved',
      });
      router.push(`/releases/${releaseData.id}`);
    } catch (e) {
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    } finally {
      setLoading(false);
    }
  };

  const status = watch('status');
  const watchedAlbumArt = watch('albumArt');

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
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <Card width="100%">
            <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
              {status === 'Complete' &&
                (existingArtwork.url || watchedAlbumArt?.length) && (
                  <Image
                    borderRadius="5px"
                    width="100%"
                    height="500px"
                    objectFit="cover"
                    alt="completed artwork"
                    src={
                      watchedAlbumArt?.length
                        ? URL.createObjectURL(watchedAlbumArt[0])
                        : existingArtwork.url
                    }
                  />
                )}
              <FormContent
                config={buildArtworkConfig(status === 'Complete')}
                errors={errors}
                register={register}
              />
              <Flex justify="flex-end">
                <Button
                  colorScheme="blue"
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
      </Stack>
    </Stack>
  );
};

export default withReleaseData(EditArtwork);
