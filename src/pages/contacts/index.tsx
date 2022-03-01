import { HStack, Stack, Text } from '@chakra-ui/layout';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  useDisclosure,
} from '@chakra-ui/react';
import { BsFillTagFill, BsSearch } from 'react-icons/bs';
import { RiAddFill } from 'react-icons/ri';

import ContactTable from 'components/contacts/ContactTable';
import useContacts from 'hooks/data/contacts/useContacts';
import useAppColors from 'hooks/useAppColors';
import { getServerSideSessionOrRedirect } from 'ssr/getServerSideSessionOrRedirect';
import PageHead from 'components/pageItems/PageHead';
import DashboardLayout from 'components/layouts/DashboardLayout';
import usePagination from 'hooks/usePagination';
import PaginationControl from 'components/PaginationControl';
import { FilterOptions } from 'queries/types';
import Card from 'components/Card';
import { ContactWithLabels } from 'types/common';
import ContactModal from 'components/contacts/ContactModal';
import ManageLabelsModal from 'components/contacts/ManageLabelsModal';

const NoficationsPage = () => {
  const [search, setSearch] = useState('');
  const { bgPrimary, bodySub } = useAppColors();

  const { pageSize, currentPage, setCurrentPage, setPageSize } = usePagination();

  const { isOpen: isNewOpen, onOpen: onNewOpen, onClose: onNewClose } = useDisclosure();
  const {
    isOpen: isManageLabelsOpen,
    onOpen: onManageLabelsOpen,
    onClose: onManageLabelsClose,
  } = useDisclosure();

  const queryArgs: FilterOptions<ContactWithLabels> = {
    pagination: { pageSize: pageSize, page: currentPage },
    search,
  };

  const { data: contacts, isLoading } = useContacts(queryArgs);

  const shouldHideControls = contacts?.total === 0;
  const totalPages = Math.ceil(contacts?.total ?? 0 / pageSize);

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const hasSelection = useMemo(() => Object.values(selectedRows).some(Boolean), [selectedRows]);

  const onSelectionChange = useCallback((rows: Record<string, boolean>) => {
    setSelectedRows(rows);
  }, []);

  return (
    <Stack bg={bgPrimary} flex={1} align="center" py={6} width="100%">
      <PageHead title="Contacts"></PageHead>

      <Stack spacing={4} width="90%" maxW="container.lg">
        <Stack direction="row" align="center" justify="space-between">
          <Heading size="xl" fontWeight="black" py={4} alignSelf="flex-start">
            All Contacts
          </Heading>
        </Stack>
        <Card>
          <Stack spacing={3}>
            <Stack
              alignItems={{ base: 'stretch', lg: 'center' }}
              direction={{ base: 'column', lg: 'row' }}
              justify="space-between"
            >
              <HStack>
                <FormControl minW={{ md: '320px' }} id="search">
                  <InputGroup size="sm">
                    <FormLabel srOnly>Filter by name or email</FormLabel>
                    <InputLeftElement pointerEvents="none" color="gray.400">
                      <BsSearch />
                    </InputLeftElement>
                    <Input
                      borderRadius="md"
                      type="search"
                      placeholder="Filter by name or email..."
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                    />
                  </InputGroup>
                </FormControl>
                {hasSelection && (
                  <Text whiteSpace="nowrap" color={bodySub} fontWeight={'semibold'} fontSize="sm">
                    {Object.values(selectedRows).filter(Boolean).length} item(s) selected
                  </Text>
                )}
              </HStack>

              <Stack
                alignItems={{ base: 'stretch', lg: 'center' }}
                direction={{ base: 'column', lg: 'row' }}
              >
                <Skeleton isLoaded={!isLoading}>
                  <Button
                    size="sm"
                    w="100%"
                    iconSpacing={1}
                    onClick={onManageLabelsOpen}
                    variant="outline"
                    leftIcon={<BsFillTagFill fontSize="1.25em" />}
                  >
                    Manage Labels
                  </Button>
                </Skeleton>
                <Skeleton isLoaded={!isLoading}>
                  <Button
                    size="sm"
                    w="100%"
                    iconSpacing={1}
                    onClick={onNewOpen}
                    leftIcon={<RiAddFill fontSize="1.25em" />}
                  >
                    New contact
                  </Button>
                </Skeleton>
              </Stack>
            </Stack>
            <Stack>
              <ContactTable
                data={contacts?.results ?? []}
                page={currentPage}
                totalPages={totalPages}
                loading={isLoading}
                selectedRows={selectedRows}
                onSelectedRowsChange={onSelectionChange}
                emptyContent={
                  <Stack py={8} alignItems="center" w="100%" alignSelf="center">
                    <Text fontSize="2xl">📇</Text>
                    <Text color={bodySub}>{"You haven't added any contacts yet."}</Text>
                  </Stack>
                }
              />
            </Stack>
          </Stack>
        </Card>
        {!shouldHideControls && (
          <PaginationControl
            loading={isLoading}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            totalItems={contacts?.total ?? 0}
          />
        )}
      </Stack>
      <ContactModal isOpen={isNewOpen} onClose={onNewClose} />
      <ManageLabelsModal isOpen={isManageLabelsOpen} onClose={onManageLabelsClose} />
    </Stack>
  );
};

NoficationsPage.getLayout = () => DashboardLayout;

export const getServerSideProps = getServerSideSessionOrRedirect;

export default NoficationsPage;
