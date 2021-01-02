import React, { useState } from 'react';
import StepWizard from 'react-step-wizard';
import { Route } from 'react-router-dom';
import Artists from './Artists';
import BasicInfo from './BasicInfo';
interface Props {}

const NewRelease = (props: Props) => {
  const [releaseId, setReleaseId] = useState('');
  return (
    // <BasicInfo />
    <Route
      render={({ history, match: { url } }) => (
        <StepWizard className={'full-width'}>
          <BasicInfo hashKey="basics" onCreate={setReleaseId} />
          <Artists hashKey="artists" releaseId={releaseId} />
        </StepWizard>
      )}
    />
  );
};

export default NewRelease;
