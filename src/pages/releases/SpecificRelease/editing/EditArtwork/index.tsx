import { Flex, Stack, Button, Text, useToast, Heading } from '@chakra-ui/react';
import Card from 'components/Card';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';
import { Artwork } from 'types';
import { buildArtworkConfig } from './artworkConfig';
import { useFirestore, useFirestoreDocData, useStorage } from 'reactfire';
import FormContent from 'components/FormContent';
import { useHistory, useParams } from 'react-router-dom';
import { SpecificReleaseParams } from '../..';

interface Props {
  releaseData: any;
}

const EditArtwork = ({ releaseData }: Props) => {
  const artworkRef = useFirestore()
    .collection('artwork')
    .doc(releaseData.artwork); // TODO: What if this is null here?

  const { releaseId } = useParams<SpecificReleaseParams>();
  const releaseRef = useFirestore().collection('releases').doc(releaseId);

  // const test = useStorage.

  const { data } = useFirestoreDocData(artworkRef, {
    idField: 'id',
  });
  const artwork: Artwork = data as Artwork;

  // TODO: Do you nead release data here? How else will firebase know where to save it?
  // TODO: SIGNup data? What is that a type?
  /* 
  TODO: There are many flows here e.g
  - We should mark something done and be able to specify a date of completion
    - Default should be today but editable
  - Done by? Should be assigned to when not complete
  - Original Due date? Should be just due date and switch to orig if over due?
  */
  const { register, errors, handleSubmit, watch } = useForm<Artwork>({
    defaultValues: artwork,
  });

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();

  const onSubmit = async (data: Artwork) => {
    try {
      setLoading(true)

      const { file, ...rest } = data

      // TODO: Save the file here

      await artworkRef.set(
        { ...rest, release: releaseId },
        { merge: true }
      );
      await releaseRef.set({ artwork: artworkRef.id }, { merge: true });
      toast({
        status: 'success',
        title: 'Success',
        description: 'Changes to artwork saved',
      });
      history.push(`/releases/${releaseData.id}`);
    } catch (e) {
      toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    } finally {
      setLoading(false);
    }
  };

  const status = watch('status');

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
        <Heading>Artwork</Heading>
        <Text>Edit your artwork task and tracking the status</Text>
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <Card width="100%">
            <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
              <FormContent
                config={buildArtworkConfig(status == 'Complete')}
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

export default EditArtwork;
