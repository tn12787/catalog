import React from 'react';
import { Flex, Stack, Heading, Text, Button, Link } from '@chakra-ui/react';
import { format } from 'date-fns';
import NextLink from 'next/link';

import { getSingleServerSideWorkspace } from 'ssr/workspaces/getSingleServerSideWorkspace';
import { EnrichedWorkspace } from 'types/common';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import PageHead from 'components/pageItems/PageHead';
import useAppColors from 'hooks/useAppColors';
import Card from 'components/Card';
import DataList from 'components/data/DataList';
import { DataListItem } from 'components/data/DataList/types';
import PlanBadge from 'components/workspaces/PlanBadge';
import { hasPaidPlan } from 'utils/billing';

type Props = {
  workspace: EnrichedWorkspace;
};

const UpgradeSuccessPage = ({ workspace }: Props) => {
  const { workspace: currentWorkspace, manageWorkspace } = useCurrentWorkspace({
    initialData: workspace,
  });

  const { bgPrimary } = useAppColors();
  return (
    <Flex bg={bgPrimary} direction="column" align="center" justify="center" flex={1} minH="100vh">
      <PageHead title="Purchase Successful" />

      <Stack w={'80%'} maxW="container.sm" spacing={6} alignItems="center">
        <Heading size="4xl" fontSize={'8xl'}>
          🎉
        </Heading>
        <Heading textAlign="center" fontWeight="semibold" fontSize="4xl">
          Thanks for your purchase!
        </Heading>
        <Text>{'Welcome to your new plan.'}</Text>
        <Card px={0} alignSelf={'stretch'}>
          <Heading px={3} size="md" fontWeight={'semibold'}>
            Your new plan
          </Heading>
          <DataList
            config={
              [
                {
                  label: 'Plan',
                  content: <PlanBadge workspace={currentWorkspace as EnrichedWorkspace} />,
                },
                hasPaidPlan(currentWorkspace, 'Label Plan') && {
                  label: 'License Seats',
                  content: (
                    <Text fontWeight="semibold">
                      {currentWorkspace?.subscription?.totalSeats ?? 'N/A'}
                    </Text>
                  ),
                },
                workspace?.subscription?.trialEnd && {
                  label: 'Trial ends on',
                  content: (
                    <Text fontWeight="semibold">
                      {format(new Date(workspace?.subscription?.trialEnd ?? Date.now()), 'PPP')}
                    </Text>
                  ),
                },
                {
                  label: 'Next Billing Date',
                  content: (
                    <Text fontWeight="semibold">
                      {format(
                        new Date(workspace?.subscription?.currentPeriodEnd ?? Date.now()),
                        'PPP'
                      )}
                    </Text>
                  ),
                },
              ].filter(Boolean) as DataListItem[]
            }
          ></DataList>

          <Stack
            px={3}
            direction={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'stretch', md: 'flex-start' }}
          >
            <Button variant="outline" size={'sm'} onClick={manageWorkspace}>
              Manage plan
            </Button>
            <NextLink href={'/overview'} passHref>
              <Button as={Link} variant="solid" colorScheme={'purple'} size={'sm'}>
                Get Started
              </Button>
            </NextLink>
          </Stack>
        </Card>
      </Stack>
    </Flex>
  );
};

export const getServerSideProps = getSingleServerSideWorkspace;

export default UpgradeSuccessPage;
