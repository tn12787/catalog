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
import { format, formatDistance } from 'date-fns';
import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

import Card from 'components/Card';
import { EnrichedTeam } from 'types/common';
import { createPortalLink } from 'queries/payments';

type Props = { team: EnrichedTeam; loading?: boolean };

const PlanCards = ({ team, loading }: Props) => {
  if (!team?.subscription) {
    return null;
  }

  const onManageClick = async () => {
    const {
      data: { url },
    } = await createPortalLink({
      teamId: team?.id ?? '',
    });

    window.location.assign(url);
  };

  return (
    <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
      <Card w="100%">
        <Stat>
          <HStack spacing={3}>
            <StatLabel>Team plan </StatLabel>
            <Button
              rightIcon={<FiExternalLink></FiExternalLink>}
              size="xs"
              onClick={onManageClick}
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
            <Button size="xs" onClick={onManageClick} colorScheme={'purple'} variant="link">
              Get more
            </Button>
          </HStack>
          <StatNumber>{team.subscription.totalSeats}</StatNumber>
          <StatHelpText>
            {(team.subscription.totalSeats ?? 1) -
              (team.members.filter((item) => {
                return item.roles.some((role) => role.name !== 'Viewer');
              }).length ?? 0)}
            {' remaining'}
          </StatHelpText>
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
