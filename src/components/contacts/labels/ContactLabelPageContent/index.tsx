import { Flex, HStack, Stack, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  useDisclosure,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { RiAddFill } from 'react-icons/ri';
import { ContactLabel } from '@prisma/client';

import ContactLabelModal from '../ContactLabelModal';

import useAppColors from 'hooks/useAppColors';
import { FilterOptions } from 'queries/types';
import Card from 'components/Card';
import { hasRequiredPermissions } from 'utils/auth';
import useExtendedSession from 'hooks/useExtendedSession';
import ContactLabelTable from 'components/contacts/labels/ContactLabelTable';
import useContactLabels from 'hooks/data/contacts/labels/useContactLabels';

type Props = {
  isDisabled?: boolean;
};

const ContactLabelPageContent = ({ isDisabled }: Props) => {
  const [search, setSearch] = useState('');
  const { bgPrimary, bodySub } = useAppColors();

  const { isOpen: isNewOpen, onOpen: onNewOpen, onClose: onNewClose } = useDisclosure();

  const queryArgs: FilterOptions<ContactLabel> = {
    search,
  };

  const { data: labels, isLoading } = useContactLabels(queryArgs);

  const { currentWorkspace, workspaceMemberships } = useExtendedSession();

  const canCreate = hasRequiredPermissions(
    ['CREATE_CONTACTS'],
    workspaceMemberships?.[currentWorkspace]
  );

  return (
    <Stack>
      <Card position={'relative'}>
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
                    placeholder="Filter labels..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                </InputGroup>
              </FormControl>
            </HStack>

            <Stack
              alignItems={{ base: 'stretch', lg: 'center' }}
              direction={{ base: 'column', lg: 'row' }}
            >
              {canCreate && (
                <Skeleton isLoaded={!isLoading}>
                  <Button
                    size="sm"
                    w="100%"
                    iconSpacing={1}
                    onClick={onNewOpen}
                    leftIcon={<RiAddFill fontSize="1.25em" />}
                  >
                    New label
                  </Button>
                </Skeleton>
              )}
            </Stack>
          </Stack>
          <Stack>
            <ContactLabelTable
              data={labels ?? []}
              loading={isLoading}
              emptyContent={
                <Stack py={8} alignItems="center" w="100%" alignSelf="center">
                  <Text fontSize="2xl">📇</Text>
                  <Text color={bodySub}>{"You haven't added any contact labels yet."}</Text>
                </Stack>
              }
            />
          </Stack>
        </Stack>
      </Card>

      <ContactLabelModal isOpen={isNewOpen} onClose={onNewClose} />
    </Stack>
  );
};

export default ContactLabelPageContent;
