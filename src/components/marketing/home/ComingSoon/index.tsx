import { useToast, Flex, Stack, Box, Heading, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Image from 'next/image';

import { mailingListConfig } from './config';

import FormContent from 'components/forms/FormContent';
import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';
import { addUserToMailingList } from 'queries/marketing/mailingLists';
import { MailingListData } from 'types/marketing/pricing';
import logo from 'images/logo.png';

const ComingSoon = () => {
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
          <FormContent
            config={mailingListConfig}
            control={control}
            register={register}
            errors={errors}
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ComingSoon;
