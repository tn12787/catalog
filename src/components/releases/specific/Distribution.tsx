import {
  Badge,
  Button,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import Card from 'components/Card';
import React, { useRef } from 'react';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { SummaryField } from './Summary';
import { Distribution as ReleaseDistribution, EnrichedRelease } from 'types';
import { useRouter } from 'next/router';
import { TaskStatus } from '.prisma/client';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

interface Props {
  releaseData: EnrichedRelease;
}

const buildFields = (releaseData: EnrichedRelease): SummaryField[] => {
  const isComplete = releaseData.distribution?.status === TaskStatus.COMPLETE;
  return [
    {
      name: 'Distributor',
      content: (
        <Text fontSize="sm">{releaseData.distribution?.distributor}</Text>
      ),
    },
    {
      name: `${isComplete ? 'Original ' : ''}Due Date`,
      content: (
        <Text fontSize="sm">
          {dayjs.utc(releaseData.distribution?.dueDate).format('LL')}
        </Text>
      ),
    },
    {
      name: 'Completed On',
      content: (
        <Text fontSize="sm">
          {dayjs.utc(releaseData.distribution?.completedOn).format('LL')}
        </Text>
      ),
      hidden: !isComplete,
    },
  ];
};

const Distribution = ({ releaseData }: Props) => {
  const router = useRouter();

  if (status === 'loading' && releaseData.distribution) {
    return (
      <Card>
        <Flex direction="row" justify="space-between">
          <Heading fontSize="2xl">💿 Distribution</Heading>
        </Flex>
        <Spinner alignSelf="center" />
      </Card>
    );
  }

  return (
    <Card>
      <Flex
        direction={['column', 'column', 'row']}
        align="center"
        justify="space-between"
      >
        <Flex align="center" direction={['column', 'column', 'row']}>
          <Heading whiteSpace="nowrap" fontSize="2xl">
            💿 Distribution
          </Heading>
          <Badge colorScheme="purple" mt={[1, 1, 0]} ml={[0, 0, 3]}>
            {releaseData.distribution?.status}
          </Badge>
        </Flex>
        {releaseData.distribution && (
          <Button
            mt={[2, 2, 0]}
            flexGrow={0}
            height="auto"
            py={1}
            px={12}
            as={Link as any}
            colorScheme="purple"
            variant="outline"
            href={`${router.query.id}/distribution/edit`}
          >
            Edit
          </Button>
        )}
      </Flex>
      {releaseData.distribution ? (
        <Flex py={4} direction={['column', 'column', 'row']}>
          <Stack
            width={['auto', 'auto', '50%']}
            spacing={3}
            pb={2}
            justify="space-between"
            direction="column"
          >
            {buildFields(releaseData).map(({ name, content, hidden }) => {
              return hidden ? null : (
                <Stack>
                  <Text fontSize="md" fontWeight="bold">
                    {name}
                  </Text>
                  {content}
                </Stack>
              );
            })}
          </Stack>
          <Stack width={['auto', 'auto', '50%']}>
            {releaseData.distribution?.notes ? (
              <Stack>
                <Text fontSize="md" fontWeight="bold">
                  Notes
                </Text>
                <Text whiteSpace="pre-wrap">
                  {releaseData.distribution?.notes}
                </Text>
              </Stack>
            ) : null}
          </Stack>
        </Flex>
      ) : (
        <Flex py={4} align="center" direction="column" justify="space-between">
          <Text color="charcoal" mb={3}>
            This release has no distribution info yet.
          </Text>
          <Button
            flexGrow={0}
            as={Link as any}
            colorScheme="purple"
            href={`${router.query.id}/distribution/edit`}
          >
            Add now
          </Button>
        </Flex>
      )}
    </Card>
  );
};

export default Distribution;
