export interface ReviewConfigItem<T> {
  key: keyof T;
  label: string;
  customContent?: JSX.Element;
}
