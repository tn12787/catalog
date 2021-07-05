import { FC } from 'react';

export interface EmptyProps {}

export interface LayoutablePage<T> extends FC<T> {
  getLayout?: () => React.FC<any>;
}
