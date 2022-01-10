import React from 'react';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import NewArtistForm from 'components/artists/NewArtistForm';
import PageHead from 'components/PageHead';

const NewArtist = () => {
  return (
    <>
      <PageHead title="New Artist" />
      <NewArtistForm />
    </>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

NewArtist.getLayout = () => DashboardLayout;

export default NewArtist;
