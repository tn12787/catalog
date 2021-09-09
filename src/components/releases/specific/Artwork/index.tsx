import {
  Button,
  Flex,
  Heading,
  Text,
  Spinner,
  Badge,
  Stack,
  Link,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import NextLink from 'next/link';

import { SummaryField } from '../Summary';

import { EnrichedRelease } from 'types';
import Card from 'components/Card';
import { TaskStatus } from '.prisma/client';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: EnrichedRelease;
}

const buildFields = (releaseData: EnrichedRelease): SummaryField[] => {
  const isComplete = releaseData.artwork?.status === TaskStatus.COMPLETE;
  return [
    {
      name: `${isComplete ? 'Completed By' : 'Assignee'}`,
      content: (
        <NextLink href={`/users/${releaseData.artwork?.completedBy}`} passHref>
          <Link fontSize="sm">{releaseData.artist.name}</Link>
        </NextLink>
      ),
    },
    {
      name: `${isComplete ? 'Original ' : ''}Due Date`,
      content: (
        <Text fontSize="sm">
          {dayjs.utc(releaseData.artwork?.dueDate).format('LL')}
        </Text>
      ),
    },
    {
      name: 'Completed On',
      content: (
        <Text fontSize="sm">
          {dayjs.utc(releaseData.artwork?.completedOn).format('LL')}
        </Text>
      ),
      hidden: !isComplete,
    },
  ];
};

const Artwork = ({ releaseData }: Props) => {
  const router = useRouter();

  const editUrl = `${router.query.id}/artwork/edit`;

  if (status === 'loading' && releaseData.artwork) {
    return (
      <Card>
        <Flex direction="row" justify="space-between">
          <Heading fontSize="2xl">🎨 Artwork</Heading>
        </Flex>
        <Spinner alignSelf="center" />
      </Card>
    );
  }

  return (
    <Card flex={1} alignItems={['center', 'center', 'stretch']}>
      <Flex
        align="center"
        justify="space-between"
        direction={['column', 'column', 'row']}
      >
        <Flex align="center" direction={['column', 'column', 'row']}>
          <Heading fontSize="2xl" fontWeight="bold">🎨 Artwork</Heading>
          <Badge colorScheme="purple" mt={[1, 1, 0]} ml={[0, 0, 3]}>
            {releaseData?.artwork?.status}
          </Badge>
        </Flex>
        {releaseData.artwork && (
          <Button
            mt={[2, 2, 0]}
            flexGrow={0}
            height="auto"
            py={1}
            px={12}
            as={'a'}
            colorScheme="purple"
            variant="outline"
            href={editUrl}
          >
            Edit
          </Button>
        )}
      </Flex>
      {releaseData.artwork ? (
        <Flex
          direction={['column', 'column', 'row']}
          py={4}
          width={'90%'}
          justify="space-between"
          alignItems={['center', 'center', 'stretch']}
        >
          <Stack width={'100%'}>
            {buildFields(releaseData).map(({ name, content, hidden }) => {
              return hidden ? null : (
                <Flex
                  mb={[3, 3, 0]}
                  width="100%"
                  align={['center', 'center', 'flex-start']}
                  direction={['row', 'row', 'column']}
                  justify={['space-between']}
                >
                  <Text fontSize="md" fontWeight="bold">
                    {name}
                  </Text>
                  {content}
                </Flex>
              );
            })}
            <Stack>
              {releaseData.artwork?.notes ? (
                <Stack>
                  <Text fontSize="md" fontWeight="bold">
                    Notes
                  </Text>
                  <Text whiteSpace="pre-wrap">
                    {releaseData.artwork?.notes}
                  </Text>
                </Stack>
              ) : null}
            </Stack>
          </Stack>
        </Flex>
      ) : (
        <Flex py={4} align="center" direction="column" justify="space-between">
          <Text mb={3}>This release has no artwork info yet.</Text>
          <Button flexGrow={0} as={'a'} colorScheme="purple" href={editUrl}>
            Add now
          </Button>
        </Flex>
      )}
    </Card>
  );
};

export default Artwork;
