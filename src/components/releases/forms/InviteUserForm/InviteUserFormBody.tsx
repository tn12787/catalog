import { Stack, Flex, Button, ButtonGroup, HStack } from '@chakra-ui/react';
import React from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';
import { User } from '@prisma/client';

import { buildInviteUserConfig } from './inviteUserConfig';

import FormContent from 'components/forms/FormContent';
import { FormBodyProps } from 'types/forms';

const InviteUserFormBody = ({ onSubmit, loading }: FormBodyProps<User>) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<User>();

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack py={6} spacing={6} width="100%" maxW="600px" margin="0 auto">
        <FormContent
          config={buildInviteUserConfig()}
          control={control}
          errors={errors}
          register={register}
        />
        <HStack justify="space-between">
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

export default InviteUserFormBody;
