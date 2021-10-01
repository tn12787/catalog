import { Flex, Heading, Badge, Stack, Text } from '@chakra-ui/layout';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/modal';
import { Button } from '@chakra-ui/react';
import React from 'react';

import { SummaryField } from '../Summary';

import Card from 'components/Card';
import { Artwork, Distribution } from 'types';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import { EventType } from 'types';
import { TaskStatus } from '.prisma/client';
import ReleaseTaskBadge from 'components/ReleaseTaskBadge';

interface Props<T> {
  heading: string | JSX.Element;
  onEditClick: () => void;
  data?: T;
  fields: SummaryField[];
  taskType: EventType;
}

const ReleaseTaskCard = <T extends Artwork | Distribution>({
  heading,
  onEditClick,
  data,
  fields,
  taskType,
}: Props<T>) => {
  const { currentTeam, teams } = useExtendedSession();
  const canEdit = hasRequiredPermissions(
    ['UPDATE_RELEASES'],
    teams?.[currentTeam]
  );

  return (
    <Card flex={1}>
      <Flex
        direction={['column', 'column', 'row']}
        align="center"
        justify="space-between"
        flexWrap="wrap"
      >
        <Stack align="center" direction={{ base: 'column', md: 'row' }}>
          {typeof heading === 'string' ? (
            <Heading whiteSpace="nowrap" fontWeight="semibold" fontSize="2xl">
              {heading}
            </Heading>
          ) : (
            heading
          )}
        </Stack>
        {data && canEdit && (
          <Button
            size="sm"
            onClick={onEditClick}
            colorScheme="purple"
            variant="outline"
          >
            Edit
          </Button>
        )}
      </Flex>
      {data ? (
        <Flex direction={['column', 'column', 'row']}>
          <Stack
            width={['auto', 'auto', '100%']}
            pb={2}
            justify="space-between"
            direction="column"
          >
            {fields.map(({ name, content, hidden }) => {
              return hidden ? null : (
                <Stack
                  width="100%"
                  align={{ base: 'flex-start', sm: 'center' }}
                  direction={{ base: 'column', sm: 'row' }}
                  justify={['space-between']}
                >
                  <Text fontSize="md" fontWeight="bold">
                    {name}
                  </Text>
                  {content}
                </Stack>
              );
            })}
            <Stack width={['auto', 'auto', '50%']}>
              {data?.notes ? (
                <Stack>
                  <Text fontSize="md" fontWeight="bold">
                    Notes
                  </Text>
                  <Text whiteSpace="pre-wrap">{data?.notes}</Text>
                </Stack>
              ) : null}
            </Stack>
          </Stack>
        </Flex>
      ) : (
        <Stack
          spacing={3}
          align="center"
          direction="column"
          justify="space-between"
        >
          <Text>This release has no {taskType} info yet.</Text>
          {canEdit && (
            <Button flexGrow={0} onClick={onEditClick} colorScheme="purple">
              Add now
            </Button>
          )}
        </Stack>
      )}
    </Card>
  );
};

export default ReleaseTaskCard;
