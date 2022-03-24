import { Flex, HStack, Stack, Text } from '@chakra-ui/layout';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Skeleton,
  useDisclosure,
} from '@chakra-ui/react';
import { BsFillTagFill, BsSearch } from 'react-icons/bs';
import { RiAddFill } from 'react-icons/ri';
import NextLink from 'next/link';

import ContactTable from 'components/contacts/ContactTable';
import useContacts from 'hooks/data/contacts/useContacts';
import useAppColors from 'hooks/useAppColors';
import usePagination from 'hooks/usePagination';
import PaginationControl from 'components/PaginationControl';
import { FilterOptions } from 'queries/types';
import Card from 'components/Card';
import { ContactWithLabels } from 'types/common';
import ContactModal from 'components/contacts/ContactModal';
import { hasRequiredPermissions } from 'utils/auth';
import useExtendedSession from 'hooks/useExtendedSession';

type Props = {
  isDisabled?: boolean;
};

const ContactPageContent = ({ isDisabled }: Props) => {
  const [search, setSearch] = useState('');
  const { bgPrimary, bodySub } = useAppColors();

  const { pageSize, currentPage, setCurrentPage, setPageSize } = usePagination();

  const { isOpen: isNewOpen, onOpen: onNewOpen, onClose: onNewClose } = useDisclosure();

  const queryArgs: FilterOptions<ContactWithLabels> = {
    pagination: { pageSize: pageSize, page: currentPage },
    search,
  };

  const { data: contacts, isLoading: areContactsLoading } = useContacts(queryArgs);

  const shouldHideControls = contacts?.total === 0 || isDisabled;
  const totalPages = Math.ceil(contacts?.total ?? 0 / pageSize);

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const hasSelection = useMemo(() => Object.values(selectedRows).some(Boolean), [selectedRows]);

  const onSelectionChange = useCallback((rows: Record<string, boolean>) => {
    setSelectedRows(rows);
  }, []);

  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const canCreate = hasRequiredPermissions(
    ['CREATE_CONTACTS'],
    workspaceMemberships?.[currentWorkspace]
  );

  return (
    <Stack>
      <Card position="relative">
        {isDisabled && (
          <Flex
            justifyContent={'center'}
            alignItems="center"
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
          >
            <Flex
              justifyContent={'center'}
              alignItems="center"
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              bg={bgPrimary}
              zIndex={'overlay'}
              opacity={0.5}
            ></Flex>
          </Flex>
        )}
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
              spacing={3}
              alignItems={{ base: 'stretch', lg: 'center' }}
              direction={{ base: 'column', lg: 'row' }}
            >
              <Skeleton isLoaded={!areContactsLoading} display="flex">
                <NextLink href="/contacts/labels" passHref>
                  <Button
                    as={Link}
                    colorScheme="purple"
                    size="sm"
                    w="100%"
                    iconSpacing={1}
                    variant="link"
                    leftIcon={<BsFillTagFill fontSize="1.25em" />}
                  >
                    {canCreate ? 'Manage' : 'View'} Labels
                  </Button>
                </NextLink>
              </Skeleton>
              {canCreate && (
                <Skeleton isLoaded={!areContactsLoading}>
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
              )}
            </Stack>
          </Stack>
          <Stack>
            <ContactTable
              data={contacts?.results ?? []}
              page={currentPage}
              totalPages={totalPages}
              loading={areContactsLoading}
              selectedRows={selectedRows}
              onSelectedRowsChange={onSelectionChange}
              emptyContent={
                search ? (
                  <Stack py={8} alignItems="center" w="100%" alignSelf="center">
                    <Text fontSize="2xl">🔎</Text>
                    <Text color={bodySub}>{'No items match your search.'}</Text>
                  </Stack>
                ) : (
                  <Stack py={8} alignItems="center" w="100%" alignSelf="center">
                    <Text fontSize="2xl">📇</Text>
                    <Text color={bodySub}>{"You haven't added any contacts yet."}</Text>
                  </Stack>
                )
              }
            />
          </Stack>
        </Stack>
      </Card>
      {!shouldHideControls && (
        <PaginationControl
          loading={areContactsLoading}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          totalItems={contacts?.total ?? 0}
        />
      )}
      <ContactModal isOpen={isNewOpen} onClose={onNewClose} />
    </Stack>
  );
};

export default ContactPageContent;
