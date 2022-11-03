import {
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Avatar,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import { OnboardingWizardComponentProps } from '../types';

import { updateSingleUser } from 'queries/me';
import ImageSelect from 'components/forms/QuickForm/ImageField/ImageSelect';
import useUser from 'hooks/useUser';

type Props = OnboardingWizardComponentProps<Pick<User, 'name' | 'image'>>;

const UserInfoForm = ({ onSubmit, isLastStep }: Props) => {
  const updateUser = useMutation(updateSingleUser);
  const { data: user } = useUser();
  const router = useRouter();

  const onSave = async (data: Pick<User, 'name' | 'image'>) => {
    try {
      await updateUser.mutateAsync({ id: user?.id as string, ...data });
      if (isLastStep) {
        router.push('/overview');
      } else {
        onSubmit(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Pick<User, 'name' | 'image'>>();

  useEffect(() => {
    if (!user) return;

    reset({ name: user.name, image: user.image });
  }, [user, reset]);

  const inputName = watch('name');
  const currentImage = watch('image');

  const onImageChange = (url: string) => {
    setValue('image', url);
  };

  return (
    <Stack spacing={6} as="form" onSubmit={handleSubmit(onSave)}>
      <Heading fontWeight="semibold" fontSize="4xl">
        Welcome 👋
      </Heading>
      <Text>{'Tell us a little about yourself below.'}</Text>
      <FormControl id="name" isInvalid={!!errors.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          placeholder={'Your name e.g. John Smith'}
          maxW="400px"
          {...register('name', { required: 'Please enter your name.' })}
        ></Input>
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl id="image">
        <FormLabel htmlFor="name">Profile photo</FormLabel>
        <Stack
          alignItems={{ base: 'flex-start', md: 'center' }}
          direction={{ base: 'column', md: 'row' }}
        >
          {currentImage && (
            <Avatar boxSize={{ base: '75px', md: '75px' }} borderRadius="md" src={currentImage} />
          )}
          <ImageSelect
            maxW="200px"
            message="Choose"
            fontWeight="semibold"
            onChange={onImageChange}
            filePath="profilePictures"
            entityId={user?.id}
          ></ImageSelect>
        </Stack>
      </FormControl>

      <Button
        type="submit"
        isLoading={updateUser.isLoading}
        variant="solid"
        alignSelf={'flex-start'}
        rightIcon={<FaArrowRight />}
        colorScheme={'purple'}
        isDisabled={!inputName || !user}
      >
        {isLastStep ? "Let's go!" : 'Next'}
      </Button>
    </Stack>
  );
};

export default UserInfoForm;
