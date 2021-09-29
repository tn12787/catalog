import { error } from 'console';

import { Input } from '@chakra-ui/input';
import {
  InputGroup,
  Flex,
  FormControl,
  border,
  FormErrorMessage,
  InputRightElement,
  HStack,
  Box,
  Text,
  Spinner,
  Button,
  ListItem,
  List,
} from '@chakra-ui/react';
import { ref } from 'firebase-functions/lib/providers/database';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useCombobox } from 'downshift';
import { useQuery } from 'react-query';

import useExtendedSession from 'hooks/useExtendedSession';
import { fetchTeam } from 'queries/teams';
import useAppColors from 'hooks/useAppColors';
import { TeamUserWithUser } from 'components/teams/TeamMembersTable/types';
interface Props extends ControllerRenderProps {}

const AssigneeSelect = ({ value, onChange }: Props) => {
  const { currentTeam, teams } = useExtendedSession();
  const { data: teamData, isLoading } = useQuery(
    ['team', teams?.[currentTeam].id as string],
    () => fetchTeam(teams?.[currentTeam].id as string)
  );

  const [searchString, setSearchString] = React.useState('');

  const allTeamMembers = teamData?.users || [];

  const {
    isOpen,
    closeMenu,
    selectedItem,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
    selectItem,
  } = useCombobox({
    items: allTeamMembers,
    inputValue: searchString,
    itemToString: (item) =>
      item?.user?.name ? item.user.name?.toLowerCase() : '',
  });

  const { bgPrimary, primary, bgSecondary, bodySub } = useAppColors();

  return (
    <InputGroup borderRadius="md" w="full">
      <Flex
        {...getComboboxProps()}
        position="relative"
        w="100%"
        direction="column"
      >
        <FormControl>
          <Input
            {...getInputProps()}
            placeholder="Username or LDAP group"
            bg={bgPrimary}
            border="1px solid"
            borderRight={0}
            borderColor={border}
            focusBorderColor={primary}
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        <List
          ref={ref}
          isOpen={isOpen && searchString.length > 0 && !isLoading}
          {...getMenuProps()}
          position="absolute"
          top="40px"
          zIndex="1"
          flex={1}
          overflowY="auto"
          p={2}
          w="100%"
          bgColor={bgPrimary}
          border="1px solid"
          borderColor={border}
          borderRadius="md"
          shadow={'md'}
        >
          {allTeamMembers.length ? (
            allTeamMembers.map((item: TeamUserWithUser, index: number) => (
              <ListItem
                {...getItemProps({ item, index })}
                key={index}
                _hover={{
                  bgColor: bgSecondary,
                }}
                itemIndex={index}
                highlightedIndex={highlightedIndex}
                onClick={() => {
                  // addUser(item);
                  closeMenu();
                }}
              >
                {item.user.name}
              </ListItem>
            ))
          ) : (
            <Text
              p={3}
              fontSize="md"
              borderRadius="md"
              cursor="pointer"
              transition="background-color 220ms, color 220ms"
              color={bodySub}
            >
              No users match your search.
            </Text>
          )}
          {/* This still needs work. Not sure if we can create users with only a username. */}
          {/* {teamData?.length > 0 && <Divider my={2} />}
            <HStack p={2}>
              <Text fontSize="sm">Can&apos;t find {searchString}?</Text>
              <Link fontSize="sm" onClick={() => {}}>
                Share with a user that hasn&apos;t logged in yet
              </Link>
            </HStack> */}
        </List>
      </Flex>
      <InputRightElement w="auto" flex={1}>
        <HStack>
          {isLoading && (
            <Box>
              <Spinner size="sm" color={bodySub} />
            </Box>
          )}
          <Button
            fontSize="lg"
            fontWeight={400}
            bgColor={bgSecondary}
            border="1px solid"
            borderColor={bodySub}
            borderRadius="0 4px 4px 0"
            // onClick={() => addUser(selectedItem)}
            isDisabled={!selectedItem}
          >
            Add
          </Button>
        </HStack>
      </InputRightElement>
    </InputGroup>
  );
};

export default AssigneeSelect;
