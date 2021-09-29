import { Input } from '@chakra-ui/input';
import {
  InputGroup,
  Flex,
  FormControl,
  InputRightElement,
  Text,
  IconButton,
} from '@chakra-ui/react';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useCombobox } from 'downshift';
import { useQuery } from 'react-query';
import { BiChevronDown } from 'react-icons/bi';

import AssigneeSelectList from './AssigneeSelectList';
import AssigneeItem from './AssigneeItem';

import useExtendedSession from 'hooks/useExtendedSession';
import { fetchTeam } from 'queries/teams';
import useAppColors from 'hooks/useAppColors';
import { TeamMemberWithUser } from 'components/teams/TeamMembersTable/types';

interface Props extends ControllerRenderProps {}

const AssigneeSelect = React.forwardRef(({ value, onChange }: Props, ref) => {
  const { currentTeam, teams } = useExtendedSession();
  console.log(value);
  const { data: teamData, isLoading } = useQuery(
    ['team', currentTeam as string],
    () => fetchTeam(currentTeam as string)
  );

  const [searchString, setSearchString] = React.useState('');

  const allTeamMembers =
    teamData?.members.filter((item) =>
      item.user.name?.toLowerCase().includes(searchString.toLowerCase())
    ) || [];

  const { border, bgPrimary, bgSecondary, primary, bodySub } = useAppColors();

  const {
    isOpen,
    closeMenu,
    selectedItem,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getToggleButtonProps,
    getItemProps,
    highlightedIndex,
    selectItem,
  } = useCombobox({
    items: allTeamMembers,
    onInputValueChange: ({ inputValue }) => {
      setSearchString(inputValue ?? '');
    },
    onSelectedItemChange: (changes) => onChange(changes.selectedItem?.user.id),
    itemToString: (item) => (item?.user?.name ? item.user.name : ''),
  });

  return (
    <InputGroup borderRadius="md" w="full">
      <Flex
        {...getComboboxProps()}
        position="relative"
        w="100%"
        direction="column"
      >
        <Input
          {...getInputProps()}
          placeholder="Search for a user..."
          border="1px solid"
          {...getToggleButtonProps()}
          focusBorderColor={primary}
        />
        <InputRightElement>
          <IconButton
            fontSize="xl"
            variant="ghost"
            {...getToggleButtonProps()}
            icon={<BiChevronDown />}
          />
        </InputRightElement>

        <AssigneeSelectList {...getMenuProps()} isOpen={isOpen && !isLoading}>
          {allTeamMembers.length ? (
            allTeamMembers.map((item: TeamMemberWithUser, index: number) => (
              <AssigneeItem
                ref={ref}
                {...getItemProps({ item, index })}
                _hover={{
                  bgColor: bgPrimary,
                }}
                key={index}
                item={item}
                itemIndex={index}
                highlightedIndex={highlightedIndex}
                onClick={() => {
                  selectItem(item);
                  closeMenu();
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
});

export default AssigneeSelect;
