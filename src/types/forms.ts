import { RegisterOptions } from 'react-hook-form';

export interface FormDatum<T, K = any> {
  name: keyof T;
  type?: string;
  label: string;
  registerArgs?: RegisterOptions;
  options?: K[];
  extraProps?: { [key: string]: any };
}
