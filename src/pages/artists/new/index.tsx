import React from 'react';

import ArtistForm from 'components/artists/ArtistForm';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/pageItems/PageHead';

const NewArtist = () => {
  return (
    <>
      <PageHead title="New Artist" />
      <ArtistForm />
    </>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

NewArtist.getLayout = () => DashboardLayout;

export default NewArtist;
