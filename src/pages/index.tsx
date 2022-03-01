import { Flex, Stack, Heading, Button, useToast, Text, Box } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Image from 'next/image';

import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';
import FormContent from 'components/forms/FormContent';
import { FormDatum } from 'types/forms';
import { MailingListData } from 'types/common';
import { addUserToMailingList } from 'queries/mailingLists';
import logo from 'images/logo.svg';

const config: FormDatum<MailingListData>[] = [
  {
    name: 'email',
    label: 'Email address',
    type: 'email',
    registerArgs: {
      required: 'Please enter your email address',
    },
  },
  {
    name: 'firstName',
    label: 'First Name (optional)',
    type: 'text',
  },
  {
    name: 'lastName',
    label: 'Last Name (optional)',
    type: 'text',
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
      <Stack w={'80%'} maxW="400px" spacing={4} alignItems="center">
        <Box w={20}>
          <Image src={logo} alt="Brand logo"></Image>
        </Box>
        <Heading fontWeight="semibold" fontSize="3xl">
          Coming soon.
        </Heading>
        <Text>Enter your information below to stay up-to-date.</Text>
        <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormContent config={config} control={control} register={register} errors={errors} />
          <Button type="submit">Submit</Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default LandingPage;
