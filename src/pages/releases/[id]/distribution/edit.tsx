import { Button, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Card from 'components/Card';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Distribution, EnrichedRelease } from 'types';
import { buildDistribConfig } from 'data/releases/distribution/distribConfig';
import FormContent from 'components/FormContent';
import { useRouter } from 'next/router';
import withReleaseData from 'HOCs/withReleaseData';
import BackButton from 'components/BackButton';
import { TaskStatus } from '.prisma/client';

interface Props {
  releaseData: EnrichedRelease;
}

const EditDistribution = ({ releaseData }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const releaseId = releaseData.id;

  const { register, errors, handleSubmit, watch } = useForm<Distribution>({
    defaultValues: releaseData.distribution,
  });

  const toast = useToast();

  const onSubmit = async (data: Distribution) => {
    console.log(data);
    try {
      setLoading(true);
      // await distribRef.current.set(
      //   { ...data, created: Date.now(), release: releaseId },
      //   { merge: true }
      // );
      // await releaseRef.update({ distribution: distribRef.current.id });

      // await createOrUpdateCalendarEventForReleaseTask(
      //   data,
      //   releaseData.name,
      //   ReleaseTaskType.DISTRIBUTION,
      //   distribRef.current,
      //   distribData.calendarEventId
      // );

      // TODO: perform update here and invalidate ['releases', releaseData.id]

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
        <BackButton
          alignSelf="flex-start"
          href={`/releases/${releaseData.id}`}
        />
        <Heading>Edit Distribution</Heading>
        <Text>Add or change info about the distributor.</Text>
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <Card width="100%">
            <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
              <FormContent
                config={buildDistribConfig(status === TaskStatus.COMPLETE)}
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

export default withReleaseData(EditDistribution);
