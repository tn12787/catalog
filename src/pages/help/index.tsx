import React from 'react';
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { BiChevronRight, BiMailSend } from 'react-icons/bi';
import NextLink from 'next/link';
import { BsBook } from 'react-icons/bs';

import SupportGridItem from 'components/help/SupportGridItem';
import DashboardLayout from 'components/layouts/DashboardLayout';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import useAppColors from 'hooks/useAppColors';
import PageHead from 'components/pageItems/PageHead';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import useFeatures from 'hooks/features/useFeatures';
import Card from 'components/Card';
import { FeatureKey } from 'common/features/types';

const HelpPage = () => {
  const { bgPrimary } = useAppColors();
  const { workspace, isLoading: isWorkspaceLoading } = useCurrentWorkspace();

  const { isFeatureEnabled } = useFeatures();

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} direction="column" width="100%">
      <PageHead title="Artists" />
      <Stack spacing={4} width="90%" maxW="container.lg">
        <Breadcrumb fontSize="sm" separator={<BiChevronRight color="gray.500" />}>
          <BreadcrumbItem>
            <Skeleton isLoaded={!isWorkspaceLoading}>
              <NextLink passHref href={`/overview`}>
                <BreadcrumbLink>{workspace?.name ?? 'loading'}</BreadcrumbLink>
              </NextLink>
            </Skeleton>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <NextLink passHref href={'/help'}>
              <BreadcrumbLink fontWeight="bold">Help & Support</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          align={{ bsae: 'stretch', md: 'center' }}
          justify="space-between"
        >
          <Heading size="2xl" fontWeight="black" alignSelf="flex-start">
            Help & Support
          </Heading>
        </Stack>
        <Card>
          <Heading size="md">How can we help?</Heading>
          <Text>Choose from one of the following items to get your issue resolved.</Text>
          <SimpleGrid columnGap={3} rowGap={3} columns={{ base: 1, md: 2 }}>
            <SupportGridItem
              href={'mailto:tom@catalogapp.io?subject=Question about Catalog'}
              color={'purple'}
              icon={BiMailSend}
              title={'Contact us via email'}
              description={'Reach out to us directly about your problem.'}
            />

            <SupportGridItem
              href={'/help/docs'}
              isDisabled={!isFeatureEnabled(FeatureKey.DOCUMENTATION)}
              color={'gray'}
              icon={BsBook}
              title={'Browse Documentation'}
              titleRight={
                !isFeatureEnabled(FeatureKey.DOCUMENTATION) ? (
                  <Badge colorScheme={'gray'} variant="solid">
                    Coming Soon
                  </Badge>
                ) : undefined
              }
              description={'Find what you need in our documentation.'}
            />
          </SimpleGrid>
        </Card>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

HelpPage.getLayout = () => DashboardLayout;

export default HelpPage;
