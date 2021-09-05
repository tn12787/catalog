import DashboardLayout from 'components/layouts/DashboardLayout';
import React from 'react';
import BasicInfoForm from 'components/releases/BasicInfoForm';
interface Props {}

const NewRelease = (props: Props) => {
  return <BasicInfoForm />;
};

NewRelease.getLayout = () => DashboardLayout;

export default NewRelease;
