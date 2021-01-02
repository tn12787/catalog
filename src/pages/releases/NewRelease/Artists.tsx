import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  // useToast,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import Card from 'components/Card';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useFirestore } from 'reactfire';
import { Release } from 'types';
import { FormDatum } from 'types/forms';
import { basicInfoConfig } from './releaseConfig';
import { WizardStep } from './types';

interface Props extends WizardStep {
  releaseId: string;
}

const Artists = ({ releaseId }: Props) => {
  const { register, errors, handleSubmit } = useForm<any>();
  const [loading, setLoading] = useState(false);
  // const collectionRef = useFirestore().collection('artists');
  // const toast = useToast();

  const onSubmit = async (data: Release) => {
    // try {
    //   setLoading(true);
    //   const newDoc = await collectionRef.doc();
    //   await newDoc.set({ ...data, created: Date.now() });
    //   toast({
    //     status: 'success',
    //     title: 'Success',
    //     description: 'Release created.',
    //   });
    //   const nextID = window.location.search = `release=${newDoc.id}`;
    //   wizard.next();
    // } catch (e) {
    //   toast({ status: 'error', title: 'Oh no...', description: e.toString() });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Stack flex={1} bg="#eee" align="center" direction="column">
      <Stack py={8} spacing={3} width="90%" maxW="900px">
        <Heading>Artist info</Heading>
        <Text>Now, let's add some artist info.</Text>
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <Card width="100%">
            <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
              {basicInfoConfig.map(
                ({
                  name,
                  type,
                  registerArgs,
                  label,
                  options,
                  extraProps,
                }: FormDatum<Release>) => {
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
                  rightIcon={<FiArrowRight />}
                  isLoading={loading}
                  type="submit"
                >
                  Next: Artists
                </Button>
              </Flex>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Artists;
