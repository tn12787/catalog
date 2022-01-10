import React from 'react';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import NewReleaseWizard from 'components/releases/NewReleaseWizard';
import PageHead from 'components/PageHead';

const NewRelease = () => {
  return (
    <>
      <PageHead title={'New release'}></PageHead>
      <NewReleaseWizard />
    </>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

NewRelease.getLayout = () => DashboardLayout;

export default NewRelease;
