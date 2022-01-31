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
} from '@chakra-ui/react';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { RiAddFill } from 'react-icons/ri';

import TeamMembersTable from './TeamMembersTable';

import { TeamMemberWithUserAndRoles } from 'types/common';
import InviteUserForm from 'components/teams/forms/InviteUserForm';

type Props = {
  members: TeamMemberWithUserAndRoles[];
};

const TeamMembers = ({ members }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack spacing={4}>
      <HStack direction={{ base: 'column', md: 'row' }} justify="space-between">
        <HStack>
          <FormControl minW={{ md: '320px' }} id="search">
            <InputGroup size="sm">
              <FormLabel srOnly>Filter by name or email</FormLabel>
              <InputLeftElement pointerEvents="none" color="gray.400">
                <BsSearch />
              </InputLeftElement>
              <Input borderRadius="md" type="search" placeholder="Filter by name or email..." />
            </InputGroup>
          </FormControl>
        </HStack>
        <ButtonGroup size="sm">
          <Button iconSpacing={1} onClick={onOpen} leftIcon={<RiAddFill fontSize="1.25em" />}>
            New member
          </Button>
        </ButtonGroup>
      </HStack>
      <TeamMembersTable teamMembers={members}></TeamMembersTable>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalHeader>
          <Heading>Invite user</Heading>
        </ModalHeader>
        <ModalContent>
          <InviteUserForm onSubmitSuccess={() => onClose()} />
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default TeamMembers;
