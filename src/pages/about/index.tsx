import React from 'react';
import { Stack, Heading } from '@chakra-ui/react';

import MarketingLayout from 'components/layouts/MarketingLayout';
import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';

const AboutPage = () => {
  const { bgPrimary } = useAppColors();
  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="Contact Us" />
      <Stack pt={'100px'} spacing={'25px'} width="90%" maxW="container.lg">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
        >
          <Heading size="2xl" fontWeight="black" alignSelf="flex-start">
            About us
          </Heading>
        </Stack>
      </Stack>
    </Stack>
  );
};

AboutPage.getLayout = () => MarketingLayout;

export default AboutPage;
