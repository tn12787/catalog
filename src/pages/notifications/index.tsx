import { HStack, Stack, Text } from '@chakra-ui/layout';
import React, { useCallback, useMemo, useState } from 'react';
import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { BiCheckDouble, BiX } from 'react-icons/bi';
import { Notification } from '@prisma/client';

import useAppColors from 'hooks/useAppColors';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/pageItems/PageHead';
import DashboardLayout from 'components/layouts/DashboardLayout';
import usePagination from 'hooks/usePagination';
import PaginationControl from 'components/PaginationControl';
import { FilterOptions } from 'queries/types';
import useNotifications from 'hooks/data/notifications/useNotifications';
import NotificationTable from 'components/notifications/NotificationTable';
import Card from 'components/Card';
import useBatchUpdateNotifications from 'hooks/data/notifications/useBatchUpdateNotifications';
import useUpdateAllNotifications from 'hooks/data/notifications/useUpdateAllNotifications.ts';

const NoficationsPage = () => {
  const { bgPrimary, bodySub } = useAppColors();

  const { pageSize, currentPage, setCurrentPage, setPageSize } = usePagination();

  const queryArgs: FilterOptions<Notification> = {
    pagination: { pageSize: pageSize, page: currentPage },
  };

  const { data: notifications, isLoading } = useNotifications(queryArgs);

  const shouldHideControls = notifications?.total === 0;
  const totalPages = Math.ceil(notifications?.total ?? 0 / pageSize);

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);

  const hasSelection = Object.values(selectedRows).some(Boolean);

  const onSelectionChange = useCallback((rows: Record<string, boolean>) => {
    setSelectedRows(rows);
    setSelectAll(false);
  }, []);

  const mappedSelectedRows = useMemo(() => {
    return Object.keys(selectedRows)
      .map((id) => notifications?.results.at(parseInt(id)) as Notification)
      .filter(Boolean) as Notification[];
  }, [selectedRows, notifications]);

  const shouldShowSelectAll =
    !selectAll &&
    mappedSelectedRows.length === notifications?.results.length &&
    mappedSelectedRows.length < notifications?.total;

  const { batchUpdate, isLoading: isBatchUpdateLoading } = useBatchUpdateNotifications({
    ids: mappedSelectedRows.map(({ id }) => id),
    read: true,
  });

  const { updateAll, isLoading: isUpdateAllLoading } = useUpdateAllNotifications();

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} width="100%">
      <PageHead title="Notifications"></PageHead>

      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack py={2}>
          <Stack pt={2} direction="row" align="center" justify="space-between">
            <Heading size="xl" fontWeight="black" alignSelf="flex-start">
              All Notifications
            </Heading>
          </Stack>
          <Text>Here you can see all notifications for the current team.</Text>
        </Stack>

        <Card>
          <Stack>
            <HStack justify={'space-between'}>
              <HStack>
                <Text color={bodySub} fontWeight={'semibold'} fontSize="sm">
                  {selectAll
                    ? notifications?.total
                    : Object.values(selectedRows).filter(Boolean).length}{' '}
                  item(s) selected
                </Text>
                {hasSelection && (
                  <ButtonGroup size="sm">
                    {shouldShowSelectAll && (
                      <Button
                        colorScheme={'purple'}
                        size="xs"
                        variant="link"
                        onClick={() => setSelectAll(true)}
                      >
                        Select all {notifications?.total} items
                      </Button>
                    )}
                  </ButtonGroup>
                )}
              </HStack>
              {/* <ButtonGroup size="sm">
                <Button leftIcon={<BiCheckDouble />}>Mark all as read</Button>
                <Button color={'red.500'} leftIcon={<BiX />}>
                  Clear all
                </Button>
              </ButtonGroup> */}
              {hasSelection && (
                <ButtonGroup size="sm">
                  <Button
                    onClick={() => (selectAll ? updateAll('read') : batchUpdate())}
                    isLoading={isBatchUpdateLoading || isUpdateAllLoading}
                    leftIcon={<BiCheckDouble />}
                  >
                    Mark as read
                  </Button>

                  {selectAll && (
                    <Button onClick={() => updateAll('delete')} leftIcon={<BiX />} color="red.400">
                      Clear all
                    </Button>
                  )}
                </ButtonGroup>
              )}
            </HStack>
            <NotificationTable
              data={notifications?.results ?? []}
              page={currentPage}
              totalPages={totalPages}
              loading={isLoading}
              selectedRows={selectedRows}
              onSelectedRowsChange={onSelectionChange}
              emptyContent={
                <Stack py={8} alignItems="center" w="100%" alignSelf="center">
                  <Text fontSize="2xl">🎉</Text>
                  <Text color={bodySub}>{"Woo hoo! You're at inbox zero."}</Text>
                </Stack>
              }
            />
          </Stack>
        </Card>
        {!shouldHideControls && (
          <PaginationControl
            loading={isLoading}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            totalItems={notifications?.total ?? 0}
          />
        )}
      </Stack>
    </Stack>
  );
};

NoficationsPage.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default NoficationsPage;
