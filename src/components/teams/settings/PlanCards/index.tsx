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
import useCurrentTeam from 'hooks/data/team/useCurrentTeam';

const PlanCards = () => {
  const { manageTeam, team, remainingLicenseSeats } = useCurrentTeam();

  if (!team?.subscription) {
    return null;
  }

  return (
    <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
      <Card w="100%">
        <Stat>
          <HStack spacing={3}>
            <StatLabel>Team plan </StatLabel>
            <Button
              rightIcon={<FiExternalLink></FiExternalLink>}
              size="xs"
              onClick={manageTeam}
              colorScheme={'purple'}
              variant="link"
            >
              {team.subscription.cancelTime ? 'Renew' : 'Manage'}
            </Button>
          </HStack>
          <StatNumber>
            {team.subscription.product.name}{' '}
            {team.subscription.cancelTime ? (
              <Badge size="sm">Cancelled</Badge>
            ) : (
              team.subscription.trialEnd &&
              new Date(team.subscription.trialEnd) > new Date() && (
                <Badge colorScheme={'blue'} size="sm">
                  Trial
                </Badge>
              )
            )}
          </StatNumber>
          <StatHelpText>Billed {team.subscription.interval}ly</StatHelpText>
        </Stat>
      </Card>
      <Card w="100%">
        <Stat>
          <HStack spacing={3}>
            <StatLabel>License seats</StatLabel>
            <Button size="xs" onClick={manageTeam} colorScheme={'purple'} variant="link">
              Get more
            </Button>
          </HStack>
          <StatNumber>{team.subscription.totalSeats}</StatNumber>
          <StatHelpText>{remainingLicenseSeats} seats remaining</StatHelpText>
        </Stat>
      </Card>
      {team.subscription.cancelTime ? (
        <Card w="100%">
          <Stat>
            <StatLabel>Current plan ends on</StatLabel>
            <StatNumber>
              {format(new Date(team.subscription.currentPeriodEnd ?? Date.now()), 'PPP')}
            </StatNumber>
          </Stat>
        </Card>
      ) : (
        <Card w="100%">
          <Stat>
            <StatLabel>Next Billing Date</StatLabel>
            <StatNumber>
              {format(new Date(team.subscription.currentPeriodEnd ?? Date.now()), 'PPP')}
            </StatNumber>
          </Stat>
        </Card>
      )}
    </Stack>
  );
};

export default PlanCards;
