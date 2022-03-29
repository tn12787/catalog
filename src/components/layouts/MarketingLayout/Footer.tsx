import {
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import * as React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import useAppColors from 'hooks/useAppColors';
import Wordmark from 'components/marketing/navigation/MarketingNavBar/Wordmark';
import { addUserToMailingList } from 'queries/mailingLists';
import { MailingListData } from 'types/marketing/pricing';

// import { Logo } from './Logo';

const Footer = () => {
  const { bodySub, bgPrimary, bgSecondary } = useAppColors();
  const { reset, register, handleSubmit } = useForm<MailingListData>({});

  const toast = useToast();

  const { mutateAsync: submitForm, isLoading } = useMutation(addUserToMailingList, {
    onSuccess: () => {
      toast({
        title: 'Thanks! Subscribed to updates',
        status: 'success',
      });
      reset();
    },
  });

  const onSubmit = (data: MailingListData) => submitForm(data);
  return (
    <Stack bg={bgPrimary}>
      <Stack maxW="container.lg" alignSelf={'center'} px={2} w="90%" as="footer" role="contentinfo">
        <Stack
          w="100%"
          spacing="8"
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          py={{ base: 12, md: 14 }}
        >
          <Stack spacing={{ base: 6, md: 8 }} align="start">
            <Wordmark></Wordmark>
            <Text color={bodySub}>First-rate tools for managing releases.</Text>
          </Stack>
          <Stack
            direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
            spacing={{ base: 12, md: 8 }}
          >
            <Stack direction="row" spacing="8">
              <Stack spacing="4" minW="36" flex="1">
                <Text fontSize="sm" fontWeight="semibold" color={bodySub}>
                  Product
                </Text>
                <Stack spacing="3" shouldWrapChildren>
                  <Button size="sm" fontWeight={'normal'} variant="link">
                    Use Cases
                  </Button>
                  <Button size="sm" fontWeight={'normal'} variant="link">
                    Pricing
                  </Button>
                  <Button
                    as={Link}
                    href={'/legal/acceptable-use'}
                    size="sm"
                    fontWeight={'normal'}
                    variant="link"
                    isExternal
                  >
                    Acceptable Use
                  </Button>
                </Stack>
              </Stack>
              <Stack spacing="4" minW="36" flex="1">
                <Text fontSize="sm" fontWeight="semibold" color={bodySub}>
                  Legal
                </Text>
                <Stack spacing="3" shouldWrapChildren>
                  <Button
                    as={Link}
                    href={'/legal/privacy'}
                    size="sm"
                    fontWeight={'normal'}
                    variant="link"
                    isExternal
                  >
                    Privacy
                  </Button>
                  <Button
                    as={Link}
                    href={'/legal/terms'}
                    size="sm"
                    fontWeight={'normal'}
                    variant="link"
                    isExternal
                  >
                    Terms
                  </Button>
                  <Button
                    as={Link}
                    href={'/legal/cookies'}
                    size="sm"
                    fontWeight={'normal'}
                    variant="link"
                    isExternal
                  >
                    Cookies
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing="4">
              <Text fontSize="sm" fontWeight="semibold" color={bodySub}>
                Stay up to date
              </Text>
              <Stack
                as="form"
                onSubmit={handleSubmit(onSubmit)}
                spacing="4"
                direction={{ base: 'column', sm: 'row' }}
                maxW={{ lg: '360px' }}
              >
                <Input
                  bg={bgSecondary}
                  size="md"
                  placeholder="Enter your email"
                  type="email"
                  required
                  {...register('email')}
                />
                <Button
                  isLoading={isLoading}
                  size="md"
                  colorScheme={'purple'}
                  type="submit"
                  flexShrink={0}
                >
                  Subscribe
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          pt="8"
          pb="12"
          justify="space-between"
          direction={{ base: 'column-reverse', md: 'row' }}
          align="center"
        >
          <Text fontSize="sm" color={bodySub}>
            &copy; {new Date().getFullYear()} Catalog. All rights reserved.
          </Text>
          <ButtonGroup colorScheme="gray" variant="ghost">
            <IconButton
              colorScheme="gray"
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              colorScheme="gray"
              as="a"
              href="#"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
            <IconButton
              colorScheme="gray"
              as="a"
              href="#"
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Footer;
