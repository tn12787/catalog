import { RegisterOptions } from 'react-hook-form';

export interface FormDatum<T> {
  name: keyof T;
  type?: string;
  label: string;
  registerArgs?: RegisterOptions;
  options?: string[];
  extraProps?: { [key: string]: any };
}
