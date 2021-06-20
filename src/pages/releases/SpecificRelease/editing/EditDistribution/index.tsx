import { Button, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Card from 'components/Card';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { Distribution, Release } from 'types';
import { buildDistribConfig } from './distribConfig';
import { useHistory, useParams } from 'react-router-dom';
import { SpecificReleaseParams } from '../..';
import FormContent from 'components/FormContent';

interface Props {
  releaseData: any;
}

const EditDistribution = ({ releaseData }: Props) => {
  const [loading, setLoading] = useState(false);

  const { releaseId } = useParams<SpecificReleaseParams>();
  const distribRef = useFirestore()
    .collection('distributions')
    .doc(releaseData.distribution);
  const releaseRef = useFirestore().collection('releases').doc(releaseId);
  const { data: distribData } = useFirestoreDocData(distribRef, {
    idField: 'id',
  }) as any;

  const { register, errors, handleSubmit, reset, watch } =
    useForm<Distribution>();

  const checkForExistence = useCallback(async () => {
    const actualDoc = await distribRef.get();
    if (actualDoc.exists) reset(distribData);
  }, [distribRef, reset, distribData]);

  useEffect(() => {
    checkForExistence();
  }, [distribData, checkForExistence]);

  const toast = useToast();
  const history = useHistory();

  const onSubmit = async (data: Release) => {
    try {
      setLoading(true);
      await distribRef.set(
        { ...data, created: Date.now(), release: releaseId },
        { merge: true }
      );
      await releaseRef.set({ distribution: distribRef.id }, { merge: true });
      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
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
        <Heading>Edit Distribution</Heading>
        <Text>Add or change info about the distributor.</Text>
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <Card width="100%">
            <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
              <FormContent
                config={buildDistribConfig(status === 'Complete')}
                errors={errors}
                register={register}
              />
              <Flex justify="flex-end">
                <Button
                  colorScheme="blue"
                  flexGrow={0}
                  leftIcon={<FiSave />}
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

export default EditDistribution;
