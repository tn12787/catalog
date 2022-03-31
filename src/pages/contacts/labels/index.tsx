import { Stack } from '@chakra-ui/layout';
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Link, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BiChevronRight } from 'react-icons/bi';

import useAppColors from 'hooks/useAppColors';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/pageItems/PageHead';
import DashboardLayout from 'components/layouts/DashboardLayout';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import ContactLabelPageContent from 'components/contacts/labels/ContactLabelPageContent';
import { canManageContacts } from 'utils/contacts';
import UnlockContacts from 'components/contacts/UnlockContacts';
import PageTitle from 'components/pageItems/PageTitle';

const ContactLabelsPage = () => {
  const { bgPrimary } = useAppColors();

  const router = useRouter();

  const { workspace, isLoading: isWorkspaceLoading } = useCurrentWorkspace();

  const canShowWorkspace = !!workspace && canManageContacts(workspace);

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} width="100%">
      <PageHead title="Manage Contact Labels"></PageHead>

      <Stack spacing={4} width="90%" maxW="container.lg">
        <Breadcrumb fontSize="sm" separator={<BiChevronRight color="gray.500" />}>
          <BreadcrumbItem>
            <Skeleton isLoaded={!isWorkspaceLoading}>
              <Link passHref href={`/overview`}>
                <BreadcrumbLink>{workspace?.name}</BreadcrumbLink>
              </Link>
            </Skeleton>
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
          <PageTitle>Manage Contact Labels</PageTitle>
        </Stack>
        {!canShowWorkspace && <UnlockContacts />}
        <ContactLabelPageContent isDisabled={!canShowWorkspace}></ContactLabelPageContent>
      </Stack>
    </Stack>
  );
};

ContactLabelsPage.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default ContactLabelsPage;
