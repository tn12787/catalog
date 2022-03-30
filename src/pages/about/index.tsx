import React from 'react';
import { Stack, Text } from '@chakra-ui/react';

import MarketingLayout from 'components/layouts/MarketingLayout';
import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';

const AboutPage = () => {
  const { bgPrimary } = useAppColors();
  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="Contact Us" />
      <Stack pt={'150px'} spacing={'100px'} width="90%" maxW="container.lg">
        <Stack>
          <Text fontWeight={'medium'} fontSize={'4xl'}>
            Our vision is to simplify release management for artists and their teams.
          </Text>
        </Stack>
        <Stack fontSize={'lg'} spacing={'20px'}>
          <Text>
            Do you ever have that feeling where you wish you could be in two places at once?
          </Text>
          <Text>We do.</Text>
          <Text>
            {
              "That's why we built Catalog, the ultimate release management tool for artists and labels."
            }
          </Text>
          <Text>
            {`The problem with planning your releases is that there are so many moving parts—it's hard
            to keep up with them all.`}
          </Text>
          <Text>{"We've been there."}</Text>
          <Text>
            {`In fact, we've been so busy tracking all the details that we've missed deadlines on more
            than one occasion! And then there's the issue of outsourcing: it can be a headache to
            keep track of when your partners deliver their work, let alone if they did the job
            correctly.`}
          </Text>
          <Text fontWeight={'medium'}>
            {`We're a team of artists, designers, and engineers who have been working on this project
            since late 2020. We're here to help you get your work out the door.`}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

AboutPage.getLayout = () => MarketingLayout;

export default AboutPage;
