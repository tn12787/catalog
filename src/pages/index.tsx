import { Flex, Stack, Heading, Button, useToast } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import PageHead from 'components/PageHead';
import useAppColors from 'hooks/useAppColors';
import FormContent from 'components/forms/FormContent';
import { FormDatum } from 'types/forms';
import { MailingListData } from 'types/common';
import { addUserToMailingList } from 'queries/mailingLists';

const config: FormDatum<MailingListData>[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    registerArgs: {
      required: 'Please enter your email address',
    },
  },
];

const LandingPage = () => {
  const { bgPrimary } = useAppColors();
  const {
    register,
    reset,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<MailingListData>({});

  const toast = useToast();

  const { mutateAsync: submitForm } = useMutation(addUserToMailingList, {
    onSuccess: () => {
      toast({
        title: "You'll hear from us shortly",
        status: 'success',
      });
      reset();
    },
  });

  const onSubmit = (data: MailingListData) => submitForm(data);

  return (
    <Flex bg={bgPrimary} direction="column" align="center" justify="center" flex={1} minH="100vh">
      <PageHead title="Home" />
      <Stack w={'80%'} maxW="400px" spacing={'40px'} alignItems="center">
        <Heading fontWeight="semibold" fontSize="3xl">
          Shh! Come back later.
        </Heading>
        <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormContent config={config} control={control} register={register} errors={errors} />
          <Button type="submit">Submit</Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default LandingPage;
