import React from 'react';

import { EnrichedRelease } from 'types';
import withReleaseData from 'HOCs/withReleaseData';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { ReleaseType } from '.prisma/client';
import NewReleaseForm from 'components/releases/NewReleaseForm';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';

interface Props {
  releaseData: EnrichedRelease;
}

const EditSummary = ({ releaseData }: Props) => {
  return <NewReleaseForm existingRelease={releaseData} />;
};

export const getServerSideProps = getServerSideSessionOrRedirect;

EditSummary.getLayout = () => DashboardLayout;

export default withReleaseData(EditSummary);
