import { Input, Select, Textarea } from '@chakra-ui/react';

export interface SelectOption {
  label: string;
  value: string;
}

export type InputComponentType = typeof Input | typeof Textarea | typeof Select;
