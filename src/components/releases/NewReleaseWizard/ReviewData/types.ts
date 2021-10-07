export interface ReviewConfigItem<T> {
  key: keyof T;
  label?: string;
  CustomComponent?: React.FC<{ value: any }>;
}
