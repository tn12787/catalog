import { ListItemProps } from '@chakra-ui/react';
import { ControllerRenderProps } from 'react-hook-form';

export interface SelectedItemListProps<T> extends Pick<ControllerRenderProps, 'onChange'> {
  items: T[];
}

export interface MultiSelectListItemProps<T> extends ListItemProps {
  item: T;
  itemIndex: number;
  highlightedIndex: number;
  selected?: boolean;
}
