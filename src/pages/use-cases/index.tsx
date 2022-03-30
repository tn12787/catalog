import React from 'react';
import { Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import Image from 'next/image';

import MarketingLayout from 'components/layouts/MarketingLayout';
import useAppColors from 'hooks/useAppColors';
import PageHead from 'components/pageItems/PageHead';
import Card from 'components/Card';
import artist from 'images/artist.svg';
import manager from 'images/manager.svg';
import label from 'images/label.svg';

const UseCasesPage = () => {
  const { bgPrimary } = useAppColors();
  return (
    <Stack bg={bgPrimary} alignItems={'center'} py={'150px'}>
      <PageHead title={'Use Cases'}></PageHead>
      <Stack w="90%" spacing={'40px'} maxW={'container.lg'}>
        <Heading>See how Catalog can help you</Heading>
        <SimpleGrid spacing={5} columns={{ base: 1, md: 3 }}>
          <Card minH={'300px'} justifyContent="space-between" alignItems={'center'}>
            <Heading size="sm" color={'pink.400'}>
              Artists
            </Heading>

            <Image alt="artist" src={artist}></Image>
          </Card>
          <Card justifyContent="space-between" alignItems={'center'}>
            <Heading size="sm" color={'green.400'}>
              Managers
            </Heading>
            <Image alt="manager" src={manager}></Image>
          </Card>
          <Card justifyContent="space-between" alignItems={'center'}>
            <Heading size="sm" color={'purple.400'}>
              Labels
            </Heading>

            <Image alt="label" src={label}></Image>
          </Card>
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

UseCasesPage.getLayout = () => MarketingLayout;

export default UseCasesPage;
