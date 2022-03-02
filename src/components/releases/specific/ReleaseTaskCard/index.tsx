import { Flex, Heading, Stack, Text, Link, HStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

import { SummaryField } from '../Summary';

import Card from 'components/Card';
import { ClientReleaseTaskData } from 'types/common';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';
import { EventType } from 'types/common';
import useAppColors from 'hooks/useAppColors';

interface Props<T> {
  heading: string | JSX.Element;
  onEditClick: () => void;
  data?: T;
  fields: SummaryField[];
  taskType: EventType;
}

const mapTaskType = (taskType: EventType) => {
  switch (taskType) {
    case EventType.MUSIC_VIDEO:
      return 'music video';
    default:
      return taskType;
  }
};

const ReleaseTaskCard = <T extends ClientReleaseTaskData>({
  heading,
  onEditClick,
  data,
  fields,
  taskType,
}: Props<T>) => {
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();
  const canEdit = hasRequiredPermissions(
    ['UPDATE_RELEASES'],
    workspaceMemberships?.[currentWorkspace]
  );
  const { bodySub } = useAppColors();
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
        {data && (
          <HStack>
            <NextLink passHref href={`/tasks/${data.id}`}>
              <Button as={Link} variant="link" size="sm" colorScheme="purple">
                View Details
              </Button>
            </NextLink>
          </HStack>
        )}
      </Flex>
      {data ? (
        <Flex direction={['column', 'column', 'row']}>
          <Stack width={['auto', 'auto', '100%']} pb={2} justify="space-between" direction="column">
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
          </Stack>
        </Flex>
      ) : (
        <Stack spacing={3} align="center" direction="column" justify="space-between">
          <Text fontSize="sm" color={bodySub}>
            This release has no {mapTaskType(taskType)} info yet.
          </Text>
          {canEdit && (
            <Button size="sm" flexGrow={0} onClick={onEditClick} colorScheme="purple">
              Add now
            </Button>
          )}
        </Stack>
      )}
    </Card>
  );
};

export default ReleaseTaskCard;
