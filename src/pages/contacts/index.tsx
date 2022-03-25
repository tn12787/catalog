import React from 'react';
import { GetServerSideProps } from 'next';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import router from 'next/router';
import { BiChevronRight } from 'react-icons/bi';

import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { canManageContacts } from 'utils/contacts';
import ContactPageContent from 'components/contacts/ContactPageContent';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';
import UnlockContacts from 'components/contacts/UnlockContacts';

const ContactsPage = () => {
  const { workspace, isLoading } = useCurrentWorkspace();

  const canShowWorkspace = !!workspace && canManageContacts(workspace);
  const { bgPrimary } = useAppColors();

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} width="100%">
      <PageHead title="Contacts"></PageHead>
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Breadcrumb fontSize="sm" separator={<BiChevronRight color="gray.500" />}>
          <BreadcrumbItem>
            <Skeleton isLoaded={!isLoading}>
              <NextLink passHref href={`/overview`}>
                <BreadcrumbLink>{workspace?.name}</BreadcrumbLink>
              </NextLink>
            </Skeleton>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink fontWeight="bold" href={router.pathname}>
              Contacts
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Stack direction="row" align="center" justify="space-between">
          <Heading size="xl" fontWeight="black" alignSelf="flex-start">
            All Contacts
          </Heading>
        </Stack>
        {!canShowWorkspace && <UnlockContacts />}
        <ContactPageContent isDisabled={!canShowWorkspace} />
      </Stack>
    </Stack>
  );
};

ContactsPage.getLayout = () => DashboardLayout;

export const getServerSideProps: GetServerSideProps = getServerSideSessionOrRedirect;

export default ContactsPage;
