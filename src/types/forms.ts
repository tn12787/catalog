import { RegisterOptions, ControllerRenderProps } from 'react-hook-form';

export interface FormDatum<T, K = any> {
  name: keyof T;
  type?: string;
  label?: string;
  registerArgs?: RegisterOptions;
  options?: { label: string; value: K }[];
  extraProps?: { [key: string]: any };
  helperText?: string;
  defaultValue?: K;
  hidden?: boolean;
  isLoading?: boolean;
  CustomComponent?: React.FC<ControllerRenderProps> & { ref?: any };
}

export interface FormBodyProps<T> {
  onSubmit: (data: T) => void;
  loading?: boolean;
}
