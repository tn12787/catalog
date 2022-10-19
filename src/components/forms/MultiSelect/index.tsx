import { Input } from '@chakra-ui/input';
import { InputGroup, Flex, InputRightElement, Text, IconButton, Stack } from '@chakra-ui/react';
import React, { forwardRef, Ref } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { useCombobox } from 'downshift';
import { BiChevronDown } from 'react-icons/bi';
import { uniqBy } from 'lodash';

import MultiSelectList from './MultiSelectList';
import { MultiSelectListItemProps, SelectedItemListProps } from './types';

import useAppColors from 'hooks/useAppColors';

interface Props<T extends object, L> extends Pick<ControllerRenderProps, 'onChange'> {
  value: T[];
  allItems: T[];
  filterFn?: (item: T, search: string) => boolean;
  itemToString?: (item: T | null) => string;
  getItem: (item: T) => L;
  borderless?: boolean;
  isLoading?: boolean;
  searchPlaceholder?: string;
  renderListItem: (props: MultiSelectListItemProps<L>) => JSX.Element;
  renderSelectedItems: (props: SelectedItemListProps<T>) => JSX.Element;
  emptyContent?: string | JSX.Element;
}

const MultiSelect = forwardRef<HTMLSelectElement, Props<any, any>>(
  <T extends { id: string }, L>(
    {
      value,
      allItems,
      isLoading,
      filterFn = () => true,
      itemToString = () => 'item',
      searchPlaceholder = 'Search',
      borderless = false,
      renderSelectedItems,
      getItem,
      onChange,
      renderListItem,
      emptyContent = 'No items match your search',
    }: Props<T, L>,
    ref: Ref<HTMLSelectElement>
  ) => {
    const [searchString, setSearchString] = React.useState('');

    const currentItems = value || [];
    const filteredItems = allItems.filter((item) => filterFn(item, searchString)) || [];

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
        {renderSelectedItems?.({ items: currentItems, onChange })}
        <InputGroup borderRadius="md" w="full">
          <Flex {...getComboboxProps()} position="relative" w="100%" direction="column">
            <Input
              ref={ref}
              {...getToggleButtonProps()}
              {...getInputProps()}
              placeholder={searchPlaceholder}
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
                filteredItems.map((item: T, index: number) =>
                  renderListItem({
                    item: getItem(item),
                    itemIndex: index,
                    ...getItemProps({ item: item, index }),
                    highlightedIndex,
                    onClick: () => {
                      selectItem(item);
                      closeMenu();
                    },
                    selected: currentItems?.some((currentItem) => currentItem.id === item.id),
                    _hover: {
                      bgColor: bgPrimary,
                    },
                    key: index,
                  })
                )
              ) : (
                <Text
                  p={3}
                  fontSize="md"
                  borderRadius="md"
                  cursor="pointer"
                  transition="background-color 220ms, color 220ms"
                  color={bodySub}
                >
                  {emptyContent}
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

export default React.memo(MultiSelect) as typeof MultiSelect;
