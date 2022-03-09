import React from 'react';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/pageItems/PageHead';
import NewArtist from 'components/artists/NewArtist';

const NewArtistPage = () => {
  return (
    <>
      <PageHead title="New Artist" />
      <NewArtist />
    </>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

NewArtistPage.getLayout = () => DashboardLayout;

export default NewArtistPage;
