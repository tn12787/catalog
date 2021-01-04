import { Button, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Card from 'components/Card';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFirestore } from 'reactfire';
import { Distribution, Release } from 'types';
import { useHistory, useParams } from 'react-router-dom';
import { SpecificReleaseParams } from '../..';
import FormContent from 'components/FormContent';
import { basicInfoConfig } from 'pages/releases/NewRelease/releaseConfig';

interface Props {
  releaseData: any;
}

const EditDistribution = ({ releaseData }: Props) => {
  const [loading, setLoading] = useState(false);

  const { releaseId } = useParams<SpecificReleaseParams>();
  const releaseRef = useFirestore().collection('releases').doc(releaseId);

  const { register, errors, handleSubmit, reset } = useForm<Distribution>();

  const checkForExistence = useCallback(async () => {
    const actualDoc = await releaseRef.get();
    if (actualDoc.exists) reset(releaseData);
  }, [releaseRef, releaseData, reset]);

  useEffect(() => {
    checkForExistence();
  }, []);

  const toast = useToast();
  const history = useHistory();

  const onSubmit = async (data: Release) => {
    try {
      setLoading(true);
      await releaseRef.set({ ...data }, { merge: true });
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
        <Heading>Edit Release</Heading>
        <Text>Add or change basic info about the release.</Text>
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <Card width="100%">
            <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
              <FormContent
                config={basicInfoConfig}
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
