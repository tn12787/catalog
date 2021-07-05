import { Button, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Card from 'components/Card';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFirestore } from 'reactfire';
import { Distribution, Release } from 'types';
import FormContent from 'components/FormContent';
import { basicInfoConfig } from 'components/releases/NewRelease/releaseConfig';
import withReleaseData from 'HOCs/withReleaseData';
import { useRouter } from 'next/router';
import BackButton from 'components/BackButton';

interface Props {
  releaseData: Release;
}

const EditSummary = ({ releaseData }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const releaseRef = useFirestore().collection('releases').doc(releaseData.id);

  const { register, errors, handleSubmit } = useForm<Release>({
    defaultValues: releaseData,
  });

  const toast = useToast();

  const onSubmit = async (data: Release) => {
    try {
      setLoading(true);
      await releaseRef.set({ ...data }, { merge: true });
      toast({
        status: 'success',
        title: 'Success',
        description: 'Your changes were saved.',
      });
      router.push(`/releases/${releaseData.id}`);
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
        <BackButton
          alignSelf="flex-start"
          href={`/releases/${releaseData.id}`}
        />
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

export default withReleaseData(EditSummary);
