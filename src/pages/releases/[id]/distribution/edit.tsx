import React from 'react';

import EditDistributionForm from 'components/releases/specific/Distribution/EditDistributionForm';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';

interface Props {}

const EditDistribution = (props: Props) => {
  return <EditDistributionForm />;
};

export const getServerSideProps = getServerSideSessionOrRedirect;

export default EditDistribution;
