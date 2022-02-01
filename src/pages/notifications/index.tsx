import { HStack, Stack, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { Heading } from '@chakra-ui/react';

import useAppColors from 'hooks/useAppColors';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/PageHead';
import DashboardLayout from 'components/layouts/DashboardLayout';
import usePagination from 'hooks/usePagination';
import PaginationControl from 'components/PaginationControl';
import { FilterOptions } from 'queries/types';
import useNotifications from 'hooks/data/useNotifications';
import NotificationTable from 'components/notifications/notificationsTable';
import Card from 'components/Card';

const NoficationsPage = () => {
  const { bgPrimary } = useAppColors();

  const { pageSize, currentPage, setCurrentPage, setPageSize } = usePagination();

  const queryArgs: FilterOptions<Notification> = {
    pagination: { pageSize: pageSize, page: currentPage },
  };

  const { data: notifications, isLoading } = useNotifications(queryArgs);

  const shouldHideControls = notifications?.total === 0;
  const totalPages = Math.ceil(notifications?.total ?? 0 / pageSize);

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} width="100%">
      <PageHead title="Notifications"></PageHead>

      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack direction="row" align="center" justify="space-between">
          <Heading size="xl" fontWeight="black" py={4} alignSelf="flex-start">
            Notifications
          </Heading>
        </Stack>
        <Card>
          <HStack justify="space-between">
            <Text>{Object.values(selectedRows).filter(Boolean).length} item(s) selected</Text>
          </HStack>
          <NotificationTable
            data={notifications?.results ?? []}
            page={currentPage}
            totalPages={totalPages}
            loading={isLoading}
            onSelectedRowsChange={setSelectedRows}
          />
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
