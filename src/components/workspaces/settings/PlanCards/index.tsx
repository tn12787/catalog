import {
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
  StatHelpText,
  Button,
  HStack,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

import Card from 'components/Card';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import useFeatures from 'hooks/features/useFeatures';
import { FeatureKey } from 'common/features/types';

const PlanCards = () => {
  const { manageWorkspace, workspace, remainingLicenseSeats } = useCurrentWorkspace();
  const { isFeatureEnabled } = useFeatures();
  if (!workspace?.subscription || !isFeatureEnabled(FeatureKey.PAYMENTS)) {
    return null;
  }

  return (
    <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
      <Card w="100%">
        <Stat>
          <HStack spacing={3}>
            <StatLabel>Workspace plan </StatLabel>
            <Button
              rightIcon={<FiExternalLink></FiExternalLink>}
              size="xs"
              onClick={manageWorkspace}
              colorScheme={'purple'}
              variant="link"
            >
              {workspace.subscription.cancelTime ? 'Renew' : 'Manage'}
            </Button>
          </HStack>
          <StatNumber>
            {workspace.subscription.productName}{' '}
            {workspace.subscription.cancelTime ? (
              <Badge size="sm">Cancelled</Badge>
            ) : (
              workspace.subscription.trialEnd &&
              new Date(workspace.subscription.trialEnd) > new Date() && (
                <Badge colorScheme={'blue'} size="sm">
                  Trial
                </Badge>
              )
            )}
          </StatNumber>
          <StatHelpText>Billed {workspace.subscription.interval}ly</StatHelpText>
        </Stat>
      </Card>
      <Card w="100%">
        <Stat>
          <HStack spacing={3}>
            <StatLabel>License seats</StatLabel>
            <Button size="xs" onClick={manageWorkspace} colorScheme={'purple'} variant="link">
              Get more
            </Button>
          </HStack>
          <StatNumber>{workspace.subscription.totalSeats}</StatNumber>
          <StatHelpText>{remainingLicenseSeats} seats remaining</StatHelpText>
        </Stat>
      </Card>
      {workspace.subscription.cancelTime ? (
        <Card w="100%">
          <Stat>
            <StatLabel>Current plan ends on</StatLabel>
            <StatNumber>
              {format(new Date(workspace.subscription.currentPeriodEnd ?? Date.now()), 'PPP')}
            </StatNumber>
          </Stat>
        </Card>
      ) : (
        <Card w="100%">
          <Stat>
            <StatLabel>Next Billing Date</StatLabel>
            <StatNumber>
              {format(new Date(workspace.subscription.currentPeriodEnd ?? Date.now()), 'PPP')}
            </StatNumber>
          </Stat>
        </Card>
      )}
    </Stack>
  );
};

export default PlanCards;
