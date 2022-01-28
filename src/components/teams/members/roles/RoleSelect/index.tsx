// TODO: Refactor this and AssigneeSelect to share some more stuff

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
import { Role } from '@prisma/client';

import RoleBadge from '../RoleBadge';

import RoleSelectList from './RoleSelectList';
import RoleItem from './RoleItem';

import useAppColors from 'hooks/useAppColors';
import { fetchRoles } from 'queries/roles';

interface Props extends Pick<ControllerRenderProps, 'onChange'> {
  value: Role[];
  borderless?: boolean;
}

const RoleSelect: React.FC<Props> = React.forwardRef(
  ({ value, borderless, onChange }: Props, ref) => {
    const currentRoles = value || [];

    const { data: allRoles, isLoading } = useQuery(['roles'], fetchRoles);

    const [searchString, setSearchString] = React.useState('');

    const filteredRoles =
      (allRoles ?? []).filter((item) =>
        item.name?.toLowerCase().includes(searchString.toLowerCase())
      ) || [];

    const { bgPrimary, primary, border, bodySub } = useAppColors();

    const onItemChange = (item: Role) => {
      const newRolesWithoutDuplicate = uniqBy([...currentRoles, item], (item) => item.id).filter(
        Boolean
      );

      onChange(newRolesWithoutDuplicate);
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
      items: filteredRoles,
      onInputValueChange: ({ inputValue }) => {
        setSearchString(inputValue ?? '');
      },
      inputValue: searchString,
      onSelectedItemChange: (changes) => {
        onItemChange(changes.selectedItem as Role);
        setSearchString('');
      },

      itemToString: (item) => item?.name ?? '',
    });

    return (
      <Stack>
        <Wrap>
          {currentRoles?.length
            ? currentRoles?.map((role) => {
                return (
                  <RoleBadge
                    onRemoveClick={(removedUser) => {
                      onChange(currentRoles?.filter((item) => item?.id !== removedUser.id));
                    }}
                    editable
                    key={role.id}
                    role={role}
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
              border={borderless ? 'none' : 'solid'}
              borderWidth={borderless ? '0' : '1px'}
              borderColor={border}
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

            <RoleSelectList {...getMenuProps()} isOpen={isOpen && !isLoading}>
              {filteredRoles.length ? (
                filteredRoles.map((item: Role, index: number) => (
                  <RoleItem
                    ref={ref}
                    selected={currentRoles?.some((assignee) => assignee.id === item.id)}
                    {...getItemProps({ item: item, index })}
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
            </RoleSelectList>
          </Flex>
        </InputGroup>
      </Stack>
    );
  }
);

RoleSelect.displayName = 'RoleSelect';

export default RoleSelect;
