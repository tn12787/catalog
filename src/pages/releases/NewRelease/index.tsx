import {
  Button,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useFirestore } from 'reactfire';
import { Release } from 'types';
import { FormDatum } from 'types/forms';
import { releaseConfig } from './releaseConfig';

interface Props {}

const NewRelease = (props: Props) => {
  const { register, errors, handleSubmit } = useForm<any>();
  const [loading, setLoading] = useState(false);
  const collectionRef = useFirestore().collection('releases');
  const history = useHistory();

  const onSubmit = async (data: Release) => {
    try {
      setLoading(true);
      await collectionRef.doc().set({ ...data, created: Date.now() });
      history.push('/releases');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack flex={1} bg="#eee" align="center" direction="column">
      <Heading>Create a new release</Heading>
      <Stack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        p={3}
        width="90%"
        maxW="400px"
        bg="white"
      >
        {releaseConfig.map(
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
                <Text fontSize="sm" fontWeight="semibold">
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
        <Button isLoading={loading} type="submit">
          Create
        </Button>
      </Stack>
    </Stack>
  );
};

export default NewRelease;
