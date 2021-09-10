import React from 'react';

import DashboardLayout from 'components/layouts/DashboardLayout';
import BasicInfoForm from 'components/releases/BasicInfoForm';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
interface Props {}

const NewRelease = (props: Props) => {
  return <BasicInfoForm />;
};

export const getServerSideProps = getServerSideSessionOrRedirect;

NewRelease.getLayout = () => DashboardLayout;

export default NewRelease;
