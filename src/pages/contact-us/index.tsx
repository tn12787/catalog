import React from 'react';
import { Button, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import useAppColors from 'hooks/useAppColors';
import PageHead from 'components/pageItems/PageHead';
import Card from 'components/Card';
import MarketingLayout from 'components/layouts/MarketingLayout';
import FormContent from 'components/forms/FormContent';
import { ContactUsData } from 'types/marketing/pricing';
import { contactUsConfig } from 'components/marketing/contact/ContactUs/config';
import { sendContactForm } from 'queries/marketing/contactUs';

const ContactUsPage = () => {
  const { bgPrimary } = useAppColors();

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactUsData>({});

  const toast = useToast();

  const { mutateAsync: submitForm } = useMutation(sendContactForm, {
    onSuccess: () => {
      toast({
        title: "You'll hear from us shortly",
        status: 'success',
      });
      reset();
    },
  });

  const onSubmit = (data: ContactUsData) => submitForm(data);

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="Contact Us" />
      <Stack pt={'100px'} spacing={'25px'} width="90%" maxW="container.lg">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
        >
          <Heading size="2xl" fontWeight="black" alignSelf="flex-start">
            Contact us
          </Heading>
        </Stack>
        <Card py={6}>
          <Text>{"Enter your information below, and we'll get back to you ASAP."}</Text>
          <Stack
            maxW="600px"
            alignSelf={'center'}
            w="90%"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormContent
              config={contactUsConfig}
              control={control}
              register={register}
              errors={errors}
            />
            <Button colorScheme={'purple'} alignSelf="flex-start" type="submit">
              Submit
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
};

ContactUsPage.getLayout = () => MarketingLayout;

export default ContactUsPage;
