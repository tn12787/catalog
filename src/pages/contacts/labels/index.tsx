import { HStack, Stack, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Skeleton,
  useDisclosure,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { RiAddFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { BiChevronRight } from 'react-icons/bi';
import { ContactLabel } from '@prisma/client';

import ContactLabelTable from 'components/contacts/labels/ContactLabelTable';
import useAppColors from 'hooks/useAppColors';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/pageItems/PageHead';
import DashboardLayout from 'components/layouts/DashboardLayout';
import Card from 'components/Card';
import useExtendedSession from 'hooks/useExtendedSession';
import useContactLabels from 'hooks/data/contacts/labels/useContactLabels';
import { FilterOptions } from 'queries/types';
import ContactLabelModal from 'components/contacts/labels/ContactLabelModal';

const ContactLabelsPage = () => {
  const [search, setSearch] = useState('');
  const { bgPrimary, bodySub } = useAppColors();

  const { isOpen: isNewOpen, onOpen: onNewOpen, onClose: onNewClose } = useDisclosure();
  const router = useRouter();

  const queryArgs: FilterOptions<ContactLabel> = {
    search,
  };

  const { workspaces: teams, currentWorkspace: currentTeam } = useExtendedSession();

  const { data: labels, isLoading } = useContactLabels(queryArgs);

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} width="100%">
      <PageHead title="Manage Contact Labels"></PageHead>

      <Stack spacing={4} width="90%" maxW="container.lg">
        <Breadcrumb fontSize="sm" separator={<BiChevronRight color="gray.500" />}>
          <BreadcrumbItem>
            <Link passHref href={`/overview`}>
              <BreadcrumbLink>{teams?.[currentTeam]?.workspace.name}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href={'/contacts/'}>Contacts</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink fontWeight="bold" href={router.pathname}>
              Labels
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Stack direction="row" align="center" justify="space-between">
          <Heading size="xl" fontWeight="black" py={4} alignSelf="flex-start">
            Manage Contact Labels
          </Heading>
        </Stack>
        <Card>
          <Stack spacing={3}>
            <Stack
              alignItems={{ base: 'stretch', lg: 'center' }}
              direction={{ base: 'column', lg: 'row' }}
              justify="space-between"
            >
              <HStack>
                <FormControl minW={{ md: '320px' }} id="search">
                  <InputGroup size="sm">
                    <FormLabel srOnly>Filter by name or email</FormLabel>
                    <InputLeftElement pointerEvents="none" color="gray.400">
                      <BsSearch />
                    </InputLeftElement>
                    <Input
                      borderRadius="md"
                      type="search"
                      placeholder="Filter labels..."
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                    />
                  </InputGroup>
                </FormControl>
              </HStack>

              <Stack
                alignItems={{ base: 'stretch', lg: 'center' }}
                direction={{ base: 'column', lg: 'row' }}
              >
                <Skeleton isLoaded={!isLoading}>
                  <Button
                    size="sm"
                    w="100%"
                    iconSpacing={1}
                    onClick={onNewOpen}
                    leftIcon={<RiAddFill fontSize="1.25em" />}
                  >
                    New label
                  </Button>
                </Skeleton>
              </Stack>
            </Stack>
            <Stack>
              <ContactLabelTable
                data={labels ?? []}
                loading={isLoading}
                emptyContent={
                  <Stack py={8} alignItems="center" w="100%" alignSelf="center">
                    <Text fontSize="2xl">📇</Text>
                    <Text color={bodySub}>{"You haven't added any contacts yet."}</Text>
                  </Stack>
                }
              />
            </Stack>
          </Stack>
        </Card>
      </Stack>
      <ContactLabelModal isOpen={isNewOpen} onClose={onNewClose} />
    </Stack>
  );
};

ContactLabelsPage.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default ContactLabelsPage;
