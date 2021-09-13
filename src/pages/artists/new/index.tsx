import React from 'react';

import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import NewArtistForm from 'components/artists/NewArtistForm';
interface Props {}

const NewRelease = (props: Props) => {
  return <NewArtistForm />;
};

export const getServerSideProps = getServerSideSessionOrRedirect;

NewRelease.getLayout = () => DashboardLayout;

export default NewRelease;
