import { HStack, Icon, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

import { FormArtist } from './types';

import { FormDatum } from 'types/forms';

export const buildArtistConfig = (): FormDatum<FormArtist>[] => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    registerArgs: { required: 'Please enter an artist name.' },
    extraProps: {
      placeholder: 'Artist name, e.g. "Tame Impala"',
    },
  },
  {
    name: 'legalName',
    label: 'Legal Name',
    type: 'text',
    registerArgs: {
      required: "Please enter the artist's legal name.",
    },
    extraProps: {
      placeholder: 'Legal name, e.g. "Kevin Parker"',
    },
    helperContent: 'The name that appears on ID documents etc.',
  },
  {
    name: 'spotifyId',
    label: 'Spotify Artist ID',
    type: 'text',

    extraProps: {
      placeholder: 'e.g.: 4cEtc4SN2eJFPVGvNsbGTH',
    },
    helperContent: (
      <LinkBox as={HStack} color={'purple.500'}>
        <LinkOverlay
          isExternal
          href="https://support.tunecore.com/hc/en-us/articles/360040325651-How-to-Find-my-Spotify-Artist-ID"
        >
          <Text>How to find a Spotify Artist ID</Text>
        </LinkOverlay>
        <Icon as={FiExternalLink}></Icon>
      </LinkBox>
    ),
  },
  {
    name: 'instagramUsername',
    label: 'Instagram Username',
    type: 'text',
    extraProps: {
      placeholder: 'e.g. tomnortonmusic',
    },
  },
  {
    name: 'linkTreeUrl',
    label: 'Linktree URL',
    type: 'text',
    extraProps: {
      placeholder: 'e.g. linktr.ee/tomnorton',
    },
  },
];
