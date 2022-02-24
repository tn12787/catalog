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
import { BiChevronDown } from 'react-icons/bi';
import { uniqBy } from 'lodash';

import MultiSelectList from './MultiSelectList';
import MultiSelectItem from './MultiSelectItem';

import useAppColors from 'hooks/useAppColors';
import AssigneeBadge from 'components/tasks/assignees/AssigneeBadge';
import MultiSelectItem from './MultiSelectList';

interface Props<T> extends Pick<ControllerRenderProps, 'onChange'> {
  value: T[];
  allItems: T[];
  filterFn?: (item: T) => boolean;
  itemToString?: (item: T | null) => string;
  borderless?: boolean;
  isLoading?: boolean;
}

const MultiSelect = React.forwardRef(
  <T extends { id: string }>(
    {
      value,
      allItems,
      isLoading,
      filterFn = () => true,
      itemToString,
      borderless = false,
      onChange,
    }: Props<T>,
    ref
  ) => {
    const [searchString, setSearchString] = React.useState('');

    const currentItems = value || [];
    const filteredItems = allItems.filter(filterFn) || [];

    const { bgPrimary, primary, bodySub, border } = useAppColors();

    const onItemChange = (item: T) => {
      const newItemsWithoutDuplicate = uniqBy([...currentItems, item], (item) => item.id).filter(
        Boolean
      );

      onChange(newItemsWithoutDuplicate);
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
      items: filteredItems,
      onInputValueChange: ({ inputValue }) => {
        setSearchString(inputValue ?? '');
      },
      inputValue: searchString,
      onSelectedItemChange: (changes) => {
        onItemChange(changes.selectedItem as T);
        setSearchString('');
      },
      itemToString,
    });

    return (
      <Stack>
        <Wrap>
          {currentItems?.length
            ? currentItems?.map((assignee) => {
                return (
                  <AssigneeBadge
                    onRemoveClick={(removedUser) => {
                      onChange(currentItems?.filter((item) => item?.id !== removedUser.id));
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

            <MultiSelectList {...getMenuProps()} isOpen={isOpen && !isLoading}>
              {filteredItems.length ? (
                filteredItems.map((item: T, index: number) => (
                  <MultiSelectItem
                    ref={ref}
                    selected={currentItems?.some((assignee) => assignee.id === item.id)}
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
            </MultiSelectList>
          </Flex>
        </InputGroup>
      </Stack>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
