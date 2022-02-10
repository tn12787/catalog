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
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { RiAddFill } from 'react-icons/ri';

import TeamMembersTable from './TeamMembersTable';

import { EnrichedTeam } from 'types/common';
import InviteUserForm from 'components/teams/forms/InviteUserForm';
import useAppColors from 'hooks/useAppColors';
import useCurrentTeam from 'hooks/data/team/useCurrentTeam';
import useFeatures from 'hooks/features/useFeatures';
import { FeatureKey } from 'common/features/types';

type Props = {
  team?: EnrichedTeam;
  remainingSeats: number;
  isDisabled?: boolean;
  loading?: boolean;
};

const TeamMembers = ({ team, remainingSeats, isDisabled, loading }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bodySub } = useAppColors();
  const { manageTeam } = useCurrentTeam();
  const { isFeatureEnabled } = useFeatures();

  const needsMoreSeats = !remainingSeats && isFeatureEnabled(FeatureKey.PAYMENTS);

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
          {needsMoreSeats && (
            <HStack fontSize="xs">
              <Text color={bodySub}>No license seats left. </Text>
              <Button size="xs" onClick={manageTeam} colorScheme={'purple'} variant="link">
                Get more
              </Button>
            </HStack>
          )}
          <Skeleton isLoaded={!loading}>
            <Button
              w="100%"
              iconSpacing={1}
              onClick={onOpen}
              isDisabled={isDisabled || needsMoreSeats}
              leftIcon={<RiAddFill fontSize="1.25em" />}
            >
              New member
            </Button>
          </Skeleton>
        </ButtonGroup>
      </Stack>
      <TeamMembersTable teamMembers={team?.members ?? []} loading={loading}></TeamMembersTable>
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
