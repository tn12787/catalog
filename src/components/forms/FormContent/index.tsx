import { Stack, StackProps } from '@chakra-ui/react';
import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import FormField from './FormField';

import { FormDatum } from 'types/forms';

interface Props<T extends FieldValues> extends StackProps {
  config: FormDatum<T>[];
  register: UseFormReturn<T>['register'];
  errors: UseFormReturn<T>['formState']['errors'];
  control: UseFormReturn<T>['control'];
}

interface FormContentComponent {
  <T extends FieldValues>(props: Props<T>): JSX.Element | null;
}

const FormContent = <T extends FieldValues>({
  errors,
  config,
  register,
  control,
  ...rest
}: Props<T>) => {
  return (
    <Stack py={6} spacing={5} width="100%" margin="0 auto" {...rest}>
      {config.map((item) => (
        <FormField
          register={register}
          errors={errors}
          control={control}
          key={item.name as string}
          {...item}
        />
      ))}
    </Stack>
  );
};

export default React.memo(FormContent) as FormContentComponent;
