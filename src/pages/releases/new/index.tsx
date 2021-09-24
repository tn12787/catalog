import React from 'react';

import DashboardLayout from 'components/layouts/DashboardLayout';
import NewReleaseForm from 'components/releases/forms/NewReleaseForm';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import NewReleaseWizard from 'components/releases/NewReleaseWizard';
import PageHead from 'components/PageHead';
interface Props {}

const NewRelease = (props: Props) => {
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
