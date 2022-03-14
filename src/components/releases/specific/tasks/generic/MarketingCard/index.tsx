import {
  Stack,
  Heading,
  Button,
  useDisclosure,
  Text,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { RiAddFill } from 'react-icons/ri';
import { BiSearch } from 'react-icons/bi';

import { marketingColumns } from './marketingColumns';
import MarketingModal from './MarketingModal';

import Card from 'components/Card';
import { ClientRelease } from 'types/common';
import TaskTable from 'components/tasks/TaskTable';
import useAppColors from 'hooks/useAppColors';

type Props = { releaseData: ClientRelease; isLoading?: boolean };

const MarketingCard = ({ releaseData, isLoading }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bodySub, bgSecondary, primary } = useAppColors();
  const [search, setSearch] = React.useState('');

  const filteredTasks = useMemo(() => {
    if (!search) {
      return releaseData.generic;
    }

    return releaseData.generic.filter((task) => {
      task.name?.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, releaseData.generic]);

  return (
    <Card spacing={4}>
      <Stack>
        <Heading fontWeight="semibold" fontSize="2xl">
          Marketing & Promotion
        </Heading>
      </Stack>
      <Text fontSize={'sm'}>
        Here you can manage all the tasks around the release itself: promotion, playlist pitches,
        marketing, PR, social media campaigns & more.
      </Text>
      <Stack w="100%" spacing={2}>
        <Stack
          alignItems={{ base: 'stretch', md: 'center' }}
          justify={'space-between'}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack
            spacing={4}
            alignItems={{ base: 'stretch', md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
          >
            <Heading size="sm">Tasks</Heading>
            <InputGroup size="sm" maxW={{ base: '100%', md: '400px' }} bg={bgSecondary}>
              <Input
                borderRadius="md"
                rounded="md"
                focusBorderColor={primary}
                placeholder="Filter tasks..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <InputRightElement>
                <Icon as={BiSearch} />
              </InputRightElement>
            </InputGroup>
          </Stack>
          <Button
            onClick={onOpen}
            variant="outline"
            leftIcon={<RiAddFill fontSize="1.25em" />}
            size="sm"
          >
            Add a task
          </Button>
        </Stack>
        <TaskTable
          loading={isLoading ?? false}
          data={filteredTasks}
          includeReleaseColumn={false}
          columns={marketingColumns()}
          emptyContent={
            search ? (
              <Stack py={8} alignItems="center" w="100%" alignSelf="center">
                <Text fontSize="2xl">🔎</Text>
                <Text color={bodySub}>{'No items match your search.'}</Text>
              </Stack>
            ) : (
              <Stack py={8} alignItems="center" w="100%" alignSelf="center">
                <Text fontSize="2xl">📝</Text>
                <Text color={bodySub}>{"You haven't added any marketing tasks yet."}</Text>
              </Stack>
            )
          }
        ></TaskTable>
      </Stack>
      <MarketingModal release={releaseData} onClose={onClose} isOpen={isOpen}></MarketingModal>
    </Card>
  );
};

export default MarketingCard;
