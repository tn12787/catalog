import { RegisterOptions } from 'react-hook-form';

export interface FormDatum<T, K = any> {
  name: keyof T;
  type?: string;
  label: string;
  registerArgs?: RegisterOptions;
  options?: { label: string; value: K }[];
  extraProps?: { [key: string]: any };
  helperText?: string;
  defaultValue?: K;
  hidden?: boolean;
  isLoading?: boolean;
}
