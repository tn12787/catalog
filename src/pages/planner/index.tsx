import DashboardLayout from 'components/layouts/DashboardLayout';
import React from 'react';
import {
  Heading,
  HStack,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
interface Props {}
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';

import useAppColors from 'hooks/useAppColors';
import { fetchReleaseEvents, updateEventInCalendar } from 'queries/events';
import Calendar from 'components/Calendar';
import { ReleaseEvent } from 'types';
import UndoToast from 'components/Calendar/UndoToast';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import ReleaseEventDrawer from 'components/planner/ReleaseEventDrawer';

const tabData = (
  events: ReleaseEvent[],
  onCalendarEventClicked: (event: ReleaseEvent) => void,
  onEventDropped: (
    event: ReleaseEvent,
    targetDate: Date
  ) => void | Promise<void>,
  isLoading: boolean
) => [
  {
    label: 'Calendar View',
    content: (
      <Calendar
        events={events}
        loading={isLoading}
        onEventClicked={onCalendarEventClicked}
        onEventDropped={onEventDropped}
      />
    ),
  },
  { label: 'List View', content: <Text>List View</Text> },
];

const Planner = (props: Props) => {
  const { bgPrimary, primary } = useAppColors();
  const { data, isLoading, error } = useQuery(
    'releaseEvents',
    fetchReleaseEvents
  );

  const queryClient = useQueryClient();

  const { mutateAsync: updateReleaseEvent } = useMutation(
    updateEventInCalendar,
    {
      onMutate: async ({ event, targetDate }) => {
        await queryClient.cancelQueries('releaseEvents');
        const events = queryClient.getQueryData('releaseEvents');

        const data = cloneDeep(events) as ReleaseEvent[];
        data?.forEach((item) => {
          if (item.data.id === event.data.id) {
            item.date = targetDate;
          }
        });

        await queryClient.setQueryData('releaseEvents', data);

        return { events };
      },

      onError: (err, newTodo, context: any) => {
        queryClient.setQueryData('releaseEvents', context?.events);
      },

      onSettled: (_, __, ___, context: any) => {
        queryClient.invalidateQueries(['releaseEvents']);
      },
    }
  );

  const toast = useToast();

  const onUndo = async (event: ReleaseEvent) => {
    await updateReleaseEvent({
      event,
      targetDate: event.date,
    });
  };

  const onItemDropped = async (item: ReleaseEvent, targetDate: Date) => {
    const backupItem = cloneDeep(item);
    try {
      await updateReleaseEvent({
        event: item,
        targetDate: dayjs.utc(targetDate).toISOString(),
      });
      toast.closeAll();
      toast({
        status: 'success',
        title: 'Event updated',
        duration: 4000,
        // eslint-disable-next-line react/display-name
        render: ({ onClose }) => (
          <UndoToast onClose={onClose} onUndo={() => onUndo(backupItem)} />
        ),
      });
    } catch (e: any) {
      console.log(e);
      toast({
        status: 'error',
        title: 'Oh no...',
        description: e.toString(),
      });
    }
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  const onCalendarEventClicked = (event: ReleaseEvent) => {
    onOpen();
  };

  const tabsToRender = tabData(
    data ?? [],
    onCalendarEventClicked,
    onItemDropped,
    isLoading
  );

  return (
    <Stack
      bg={bgPrimary}
      flex={1}
      align="center"
      direction="column"
      py={6}
      width="100%"
    >
      <Stack spacing={4} width="95%" maxW="container.full">
        <ReleaseEventDrawer isOpen={isOpen} onClose={onClose} />
        <Stack w="100%" alignItems="center">
          <Tabs w="100%" align="center" colorScheme="purple">
            <Stack
              justifyContent="space-between"
              direction={{ base: 'column', md: 'row' }}
            >
              <HStack
                spacing={4}
                alignItems="center"
                alignSelf={{ base: 'center', md: 'stretch' }}
              >
                <Heading size="2xl" py={4} as="h1" fontWeight="black">
                  Planner
                </Heading>
                {isLoading && (
                  <Spinner thickness="3px" color={primary} speed="1s"></Spinner>
                )}
              </HStack>
              <TabList borderBottom="none" alignSelf="center">
                {tabsToRender.map((item) => (
                  <Tab
                    fontWeight="semibold"
                    py={0}
                    px={0}
                    mx={2}
                    key={item.label}
                  >
                    {item.label}
                  </Tab>
                ))}
              </TabList>
            </Stack>
            <TabPanels>
              {tabsToRender.map((item) => (
                <TabPanel px={0} key={item.label}>
                  {item.content}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const getServerSideProps = getServerSideSessionOrRedirect;

Planner.getLayout = () => DashboardLayout;

export default Planner;
