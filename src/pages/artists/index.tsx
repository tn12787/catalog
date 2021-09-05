import DashboardLayout from 'components/layouts/DashboardLayout';
import { fetchArtists } from 'queries/artists';
import React from 'react';
import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
interface Props {}

const Artists = (props: Props) => {
  const { data: artists } = useQuery('artists', fetchArtists);
  return (
    <Stack
      flex={1}
      bg="#eee"
      align="center"
      py={6}
      direction="column"
      width="100%"
    >
      <Stack spacing={4} width="90%" maxW="900px">
        <Stack direction="row" align="center" justify="space-between">
          <Heading py={4} color="orange.400" alignSelf="flex-start">
            Artists
          </Heading>
          <Button href={'/releases/new'} as={'a'}>
            Create New Release
          </Button>
        </Stack>
        <Stack>
          {artists?.map((artist) => (
            <Text key={artist.id}>
              {artist.name} ({artist.legalName})
            </Text>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

Artists.getLayout = () => DashboardLayout;

export default Artists;
