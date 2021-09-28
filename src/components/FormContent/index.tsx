import {
  Input,
  Textarea,
  Select,
  Stack,
  Text,
  ComponentWithAs,
  InputGroup,
  InputRightElement,
  Spinner,
  Box,
  StackProps,
  FormLabel,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import FormField from './FormField';

import { FormDatum } from 'types/forms';

interface Props<T> extends StackProps {
  config: FormDatum<T>[];
  register: UseFormReturn<T>['register'];
  errors: UseFormReturn<T>['formState']['errors'];
}

const FormContent = <T extends any>({
  errors,
  config,
  register,
  ...rest
}: Props<T>) => {
  return (
    <Stack py={6} spacing={6} width="100%" margin="0 auto" {...rest}>
      {config.map((item) => (
        <FormField
          register={register}
          key={item.name as string}
          {...item}
          errors={errors}
        />
      ))}
    </Stack>
  );
};

export default FormContent;
