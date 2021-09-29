import { Input } from '@chakra-ui/input';
import {
  InputGroup,
  Flex,
  FormControl,
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
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useCombobox } from 'downshift';
import { useQuery } from 'react-query';

import AssigneeSelectList from './AssigneeSelectList';
import AssigneeItem from './AssigneeItem';

import useExtendedSession from 'hooks/useExtendedSession';
import { fetchTeam } from 'queries/teams';
import useAppColors from 'hooks/useAppColors';
import { TeamUserWithUser } from 'components/teams/TeamMembersTable/types';

interface Props extends ControllerRenderProps {}

const AssigneeSelect = ({ value, onChange }: Props) => {
  const { currentTeam, teams } = useExtendedSession();

  const { data: teamData, isLoading } = useQuery(
    ['team', currentTeam as string],
    () => fetchTeam(currentTeam as string)
  );

  const [searchString, setSearchString] = React.useState('');

  const allTeamMembers = teamData?.users || [];

  console.log(allTeamMembers);

  const { border, bgPrimary, bgSecondary, primary, bodySub } = useAppColors();

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
    onInputValueChange: ({ inputValue }) => {
      setSearchString(inputValue ?? '');
    },
    itemToString: (item) => (item?.user?.name ? item.user.name : ''),
  });

  const setAssignee = (item: any) => {
    const userItem = item ?? selectedItem;

    onChange(userItem.user.id);
    selectItem(null as any);
  };

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
            placeholder="Search for a user..."
            border="1px solid"
            focusBorderColor={primary}
          />
        </FormControl>
        {
          <AssigneeSelectList
            {...getMenuProps()}
            isOpen={isOpen && searchString.length > 0 && !isLoading}
          >
            {allTeamMembers.length ? (
              allTeamMembers.map((item: TeamUserWithUser, index: number) => (
                <AssigneeItem
                  {...getItemProps({ item, index })}
                  key={index}
                  item={item}
                  itemIndex={index}
                  highlightedIndex={highlightedIndex}
                  onClick={() => {
                    setAssignee(item);
                    // closeMenu();
                  }}
                />
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
          </AssigneeSelectList>
        }
      </Flex>
      {/* <InputRightElement w="auto" flex={1}>
        <HStack>
          {isLoading && (
            <Box>
              <Spinner size="sm" />
            </Box>
          )}
          <Button
            fontSize="lg"
            fontWeight={400}
            // bgColor={bgSecondary}
            border="1px solid"
            // borderColor={bodySub}
            borderRadius="0 4px 4px 0"
            // onClick={() => addUser(selectedItem)}
            isDisabled={!selectedItem}
          >
            Add
          </Button>
        </HStack>
      </InputRightElement> */}
    </InputGroup>
  );
};

export default AssigneeSelect;
