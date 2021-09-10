import React from 'react';

import { EnrichedRelease } from 'types';
import withReleaseData from 'HOCs/withReleaseData';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { ReleaseType } from '.prisma/client';
import BasicInfoForm from 'components/releases/BasicInfoForm';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';

interface Props {
  releaseData: EnrichedRelease;
}

const EditSummary = ({ releaseData }: Props) => {
  return <BasicInfoForm existingRelease={releaseData} />;
};

export const getServerSideProps = getServerSideSessionOrRedirect;

EditSummary.getLayout = () => DashboardLayout;

export default withReleaseData(EditSummary);
