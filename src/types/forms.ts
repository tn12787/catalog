import { RegisterOptions, ControllerRenderProps } from 'react-hook-form';

import { SortByOptions } from 'queries/types';

export interface FormDatum<T, K = any> {
  name: keyof T;
  type?: string;
  label?: string;
  registerArgs?: RegisterOptions;
  options?: { label: string; value: K }[];
  extraProps?: { [key: string]: any };
  helperContent?: string | JSX.Element;
  defaultValue?: K;
  hidden?: boolean;
  isLoading?: boolean;
  CustomComponent?: React.FC<ControllerRenderProps> & { ref?: any };
}

export interface FormBodyProps<T> {
  onSubmit: (data: T) => void;
  loading?: boolean;
}

export interface SortBySelectOption<T> {
  label: string;
  value: SortByOptions<T>;
}
