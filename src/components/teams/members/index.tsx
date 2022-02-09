import {
  Stack,
  HStack,
  FormControl,
  InputGroup,
  FormLabel,
  InputLeftElement,
  Input,
  ButtonGroup,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Heading,
  Skeleton,
} from '@chakra-ui/react';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { RiAddFill } from 'react-icons/ri';

import TeamMembersTable from './TeamMembersTable';

import { TeamMemberWithUserAndRoles } from 'types/common';
import InviteUserForm from 'components/teams/forms/InviteUserForm';

type Props = {
  members: TeamMemberWithUserAndRoles[];
  isDisabled?: boolean;
  loading?: boolean;
};

const TeamMembers = ({ members, isDisabled, loading }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack spacing={4} position="relative">
      <Stack
        alignItems={{ base: 'stretch', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
      >
        <HStack>
          <Skeleton isLoaded={!loading}>
            <FormControl minW={{ md: '320px' }} id="search" isDisabled={isDisabled}>
              <InputGroup size="sm">
                <FormLabel srOnly>Filter by name or email</FormLabel>
                <InputLeftElement pointerEvents="none" color="gray.400">
                  <BsSearch />
                </InputLeftElement>
                <Input borderRadius="md" type="search" placeholder="Filter by name or email..." />
              </InputGroup>
            </FormControl>
          </Skeleton>
        </HStack>
        <ButtonGroup
          alignItems={{ base: 'stretch', md: 'center' }}
          direction={{ base: 'column', md: 'row' }}
          size="sm"
        >
          <Skeleton isLoaded={!loading}>
            <Button
              w="100%"
              iconSpacing={1}
              onClick={onOpen}
              isDisabled={isDisabled}
              leftIcon={<RiAddFill fontSize="1.25em" />}
            >
              New member
            </Button>
          </Skeleton>
        </ButtonGroup>
      </Stack>
      <TeamMembersTable teamMembers={members} loading={loading}></TeamMembersTable>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalHeader>
          <Heading>Invite user</Heading>
        </ModalHeader>
        <ModalContent w="90%">
          <InviteUserForm onSubmitSuccess={() => onClose()} />
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default TeamMembers;
