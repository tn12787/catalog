import { RegisterOptions } from 'react-hook-form';

export interface LoginData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface FormDatum<T> {
  name: keyof T;
  type?: string;
  label: string;
  registerArgs?: RegisterOptions;
}
