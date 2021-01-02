import { Flex, Stack, Input, Button, Text, useToast, Heading, Select } from '@chakra-ui/react';
import Card from 'components/Card';
import { basicInfoConfig } from 'pages/releases/NewRelease/releaseConfig';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Release } from 'types';
import { FormDatum } from 'types/forms';
import { artworkConfig } from './artworkConfig';
import { ArtworkData } from './types';

interface Props { }

const EditArtwork = (props: Props) => {
  // TODO: Do you nead release data here? How else will firebase know where to save it?
  // TODO: SIGNup data? What is that a type?
  /* 
  TODO: There are many flows here e.g
  - We should mark something done and be able to specify a date of completion
    - Default should be today but editable
  - Done by? Should be assigned to when not complete
  - Original Due date? Should be just due date and switch to orig if over due?
  */
  const { register, errors, handleSubmit, setError } = useForm<ArtworkData>();

  const [loading, setLoading] = useState(false);

  const toast = useToast()

  const onSubmit = async ({
    dueDate,
    assignee,
    status
  }: ArtworkData) => {
    try {
      setLoading(true);
      /*const userData = await auth.createUserWithEmailAndPassword(
        email,
        password
      );*/
      /*const userRef = firestore.collection('users').doc(userData.user?.uid);
      userRef.set({
        name,
      });*/
      toast({
        status: 'success',
        title: 'Success',
        description: `Artwork created! Currently ${status}, assigned to ${assignee} due by ${dueDate}`,
      });
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
        <Heading>Artwork</Heading>
        <Text>Edit your artwork task and tracking the status</Text>
        <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
          <Card width="100%">
            <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
              {artworkConfig.map(
                ({ name, type, registerArgs, label, options }: FormDatum<ArtworkData>) => {
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
