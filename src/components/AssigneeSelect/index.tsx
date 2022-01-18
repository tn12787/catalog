import { Input } from '@chakra-ui/input';
import {
  InputGroup,
  Flex,
  InputRightElement,
  Text,
  IconButton,
  Stack,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useCombobox } from 'downshift';
import { useQuery } from 'react-query';
import { BiChevronDown } from 'react-icons/bi';
import { uniqBy } from 'lodash';

import AssigneeSelectList from './AssigneeSelectList';
import AssigneeItem from './AssigneeItem';

import useExtendedSession from 'hooks/useExtendedSession';
import { fetchTeam } from 'queries/teams';
import useAppColors from 'hooks/useAppColors';
import AssigneeBadge from 'components/AssigneeBadge';
import { TeamMemberWithUser, TeamMemberWithUserAndRoles } from 'types';

interface Props extends Pick<ControllerRenderProps, 'onChange'> {
  value: TeamMemberWithUser[];
}

const AssigneeSelect: React.FC<Props> = React.forwardRef(({ value, onChange }: Props, ref) => {
  const { currentTeam } = useExtendedSession();
  const currentAssignees = value || [];

  const { data: teamData, isLoading } = useQuery(['team', currentTeam as string], () =>
    fetchTeam(currentTeam as string)
  );

  const [searchString, setSearchString] = React.useState('');

  const allTeamMembers =
    teamData?.members.filter((item) =>
      item.user.name?.toLowerCase().includes(searchString.toLowerCase())
    ) || [];

  const { bgPrimary, primary, bodySub } = useAppColors();

  const onItemChange = (item: TeamMemberWithUser) => {
    const newAssigneesWithoutDuplicate = uniqBy(
      [...currentAssignees, item],
      (item) => item.id
    ).filter(Boolean);

    onChange(newAssigneesWithoutDuplicate);
  };

  const {
    isOpen,
    closeMenu,
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
    inputValue: searchString,
    onSelectedItemChange: (changes) => {
      onItemChange(changes.selectedItem as TeamMemberWithUser);
      setSearchString('');
    },

    itemToString: (item) => item?.user.name ?? '',
  });

  return (
    <Stack>
      <Wrap>
        {currentAssignees?.length
          ? currentAssignees?.map((assignee) => {
              return (
                <AssigneeBadge
                  onRemoveClick={(removedUser) => {
                    onChange(currentAssignees?.filter((item) => item?.id !== removedUser.id));
                  }}
                  editable
                  key={assignee.id}
                  teamMember={assignee}
                />
              );
            })
          : null}
      </Wrap>
      <InputGroup borderRadius="md" w="full">
        <Flex {...getComboboxProps()} position="relative" w="100%" direction="column">
          <Input
            {...getToggleButtonProps()}
            {...getInputProps()}
            placeholder="Search for a user..."
            border="1px solid"
            value={searchString}
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
              allTeamMembers.map((item: TeamMemberWithUserAndRoles, index: number) => (
                <AssigneeItem
                  ref={ref}
                  selected={currentAssignees?.some((assignee) => assignee.id === item.id)}
                  {...getItemProps({ item: item, index })}
                  _hover={{
                    bgColor: bgPrimary,
                  }}
                  key={index}
                  item={item.user}
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
      </InputGroup>
    </Stack>
  );
});

AssigneeSelect.displayName = 'AssigneeSelect'; // TODO: understand why build fails without this

export default AssigneeSelect;
