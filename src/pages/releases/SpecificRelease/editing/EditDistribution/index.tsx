import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FiSave } from 'react-icons/fi';
import Card from 'components/Card';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFirestore, useFirestoreDocDataOnce } from 'reactfire';
import { Distribution, Release } from 'types';
import { FormDatum } from 'types/forms';
import { distribConfig } from './distribConfig';
import { useHistory, useParams } from 'react-router-dom';
import { SpecificReleaseParams } from '../..';

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
  const { data: distribData } = useFirestoreDocDataOnce(distribRef, {
    idField: 'id',
  }) as any;

  const { register, errors, handleSubmit } = useForm<Distribution>({
    defaultValues: distribData as Distribution,
  });

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
        description: 'Distribution info created successfully.',
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
        <Heading>Edit Distribution</Heading>
        <Text>Enter info about the distributor and the task's due date.</Text>
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <Card width="100%">
            <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
              {distribConfig.map(
                ({
                  name,
                  type,
                  registerArgs,
                  label,
                  options,
                  extraProps,
                }: FormDatum<Distribution>) => {
                  return (
                    <Stack key={name}>
                      <Text fontSize="md" fontWeight="semibold">
                        {label}
                      </Text>
                      {type === 'select' ? (
                        <Select
                          width="100%"
                          isInvalid={!!errors[name]}
                          name={name}
                          ref={register({ ...registerArgs })}
                          {...extraProps}
                        >
                          {options?.map((option) => (
                            <option value={option}>{option}</option>
                          ))}
                        </Select>
                      ) : (
                        <Input
                          isInvalid={!!errors[name]}
                          name={name}
                          type={type}
                          ref={register({ ...registerArgs })}
                          {...extraProps}
                        />
                      )}
                      <Text color="red.400">{errors[name]?.message}</Text>
                    </Stack>
                  );
                }
              )}
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
