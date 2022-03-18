import { Stack } from '@chakra-ui/react';
import React from 'react';

import PageHead from 'components/pageItems/PageHead';

const Homepage = () => {
  return (
    <Stack>
      <PageHead
        title={'Launchday - Delightful release management tools for artists and their teams.'}
      ></PageHead>
    </Stack>
  );
};

export default Homepage;
