import { Stack, FormControl, FormLabel, Image, Flex, Button, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowRight, FiSave } from 'react-icons/fi';

import { buildArtistConfig } from '../artistConfig';
import { FormArtist } from '../types';

import ImageSelect from 'components/forms/QuickForm/ImageField/ImageSelect';
import FormContent from 'components/forms/FormContent';
import ArtistPlaceholder from 'components/artists/ArtistPlaceholder';

type Props = {
  existingArtist?: FormArtist;
  onSubmit: (data: FormArtist) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
};

const ArtistFormBody = ({ isDisabled, onSubmit, existingArtist, isLoading: loading }: Props) => {
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
      <Stack py={6} spacing={6} width="100%" margin="0 auto">
        <Stack spacing={{ base: 6, lg: '50px' }} direction={{ base: 'column', lg: 'row' }}>
          <Stack w="100%">
            <Text fontWeight={'bold'}>Photo</Text>
            <FormControl id="image">
              <FormLabel hidden fontSize={'sm'} htmlFor="image">
                Artist Image
              </FormLabel>
              <Stack alignItems={{ base: 'stretch' }} direction={{ base: 'column' }}>
                <Image
                  rounded="lg"
                  objectFit={'cover'}
                  maxWidth={{ base: '100%', sm: '100%' }}
                  maxHeight={{ base: '100%', lg: '500px' }}
                  src={currentImage ?? undefined}
                  fallback={<ArtistPlaceholder />}
                  alt="workspace image"
                />
                <ImageSelect
                  message="Choose an image"
                  fontWeight="semibold"
                  onChange={onImageChange}
                  filePath="artistImages"
                  entityId={existingArtist?.id}
                ></ImageSelect>
              </Stack>
            </FormControl>
          </Stack>

          <Stack w="100%">
            <Text fontWeight={'bold'}>Info</Text>
            <FormContent
              py={0}
              config={buildArtistConfig()}
              errors={errors}
              register={register}
              control={control}
            />
          </Stack>
        </Stack>
        <Flex justify="flex-end">
          <Button
            colorScheme="purple"
            flexGrow={0}
            rightIcon={existingArtist ? <FiSave></FiSave> : <FiArrowRight />}
            isLoading={loading}
            type="submit"
            isDisabled={isDisabled || !name || !legalName}
          >
            {existingArtist ? 'Save' : 'Create'}
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default ArtistFormBody;
