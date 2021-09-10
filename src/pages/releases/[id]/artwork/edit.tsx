import React from 'react';

import EditArtworkForm from 'components/releases/specific/Artwork/EditArtworkForm';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';

interface Props {}

const EditArtwork = (props: Props) => {
  return <EditArtworkForm />;
};

export const getServerSideProps = getServerSideSessionOrRedirect;

export default EditArtwork;
