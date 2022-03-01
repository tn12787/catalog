import { Stack, Button, ButtonGroup, HStack } from '@chakra-ui/react';
import React from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

import { buildEditContactConfig } from './editContactConfig';

import FormContent from 'components/forms/FormContent';
import { FormBodyProps } from 'types/forms';
import { ContactWithLabels } from 'types/common';

interface EditContactFormBodyProps<T> extends FormBodyProps<T> {
  existingData?: T;
}

const EditContactFormBody = ({
  onSubmit,
  loading,
  existingData,
}: EditContactFormBodyProps<ContactWithLabels>) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ContactWithLabels>({ defaultValues: existingData });

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack spacing={3} width="100%" maxW="600px" margin="0 auto">
        <FormContent
          config={buildEditContactConfig()}
          control={control}
          errors={errors}
          register={register}
        />
        <HStack justify="flex-end">
          <ButtonGroup>
            <Button
              colorScheme="purple"
              flexGrow={0}
              rightIcon={<FiSave />}
              isLoading={loading}
              type="submit"
            >
              Save
            </Button>
          </ButtonGroup>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default EditContactFormBody;
