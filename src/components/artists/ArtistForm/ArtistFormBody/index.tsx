import { Stack, FormControl, FormLabel, Avatar, Flex, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowRight } from 'react-icons/fi';

import { buildArtistConfig } from '../artistConfig';
import { FormArtist } from '../types';

import ImageSelect from 'components/forms/QuickForm/ImageField/ImageSelect';
import FormContent from 'components/forms/FormContent';

type Props = {
  existingArtist?: FormArtist;
  onSubmit: (data: FormArtist) => void;
  isLoading?: boolean;
};

const ArtistFormBody = ({ onSubmit, existingArtist, isLoading: loading }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
  } = useForm<FormArtist>({
    defaultValues: {
      ...existingArtist,
    },
  });

  useEffect(() => {
    if (existingArtist) {
      reset({
        ...existingArtist,
      });
    }
  }, [existingArtist, reset]);

  const currentImage = watch('imageUrl');

  const onImageChange = (url: string) => {
    setValue('imageUrl', url);
  };

  const name = watch('name');
  const legalName = watch('legalName');

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
        <FormControl name="image">
          <FormLabel fontSize={'sm'} htmlFor="name">
            Artist Image
          </FormLabel>
          <Stack alignItems={{ base: 'center' }} direction={{ base: 'column' }}>
            {currentImage && (
              <Avatar
                boxSize={{ base: '100%', md: '100%' }}
                borderRadius="md"
                src={currentImage}
                alt="workspace image"
              />
            )}
            <ImageSelect
              message="Choose an image"
              fontWeight="semibold"
              onChange={onImageChange}
              filePath="artistImages"
              entityId={existingArtist?.id}
            ></ImageSelect>
          </Stack>
        </FormControl>

        <FormContent
          py={0}
          config={buildArtistConfig()}
          errors={errors}
          register={register}
          control={control}
        />
        <Flex justify="flex-end">
          <Button
            colorScheme="purple"
            flexGrow={0}
            rightIcon={<FiArrowRight />}
            isLoading={loading}
            type="submit"
            isDisabled={!name || !legalName}
          >
            {existingArtist ? 'Save' : 'Create'}
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default ArtistFormBody;
