import React from 'react';
import { GetServerSideProps } from 'next';

import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { canManageContacts } from 'utils/contacts';
import ContactPageContent from 'components/contacts/ContactPageContent';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

const ContactsPage = () => {
  const { workspace, isLoading } = useCurrentWorkspace();

  const canShowWorkspace = !!workspace && canManageContacts(workspace);

  return canShowWorkspace ? (
    <ContactPageContent isLoading={isLoading} workspace={workspace}></ContactPageContent>
  ) : null;
};

ContactsPage.getLayout = () => DashboardLayout;

export const getServerSideProps: GetServerSideProps = getServerSideSessionOrRedirect;

export default ContactsPage;
