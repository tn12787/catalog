import {
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Box,
  Text,
  Spinner,
  FormHelperText,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react';
import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import React from 'react';
import { UseFormReturn, FieldValues, Controller, Control } from 'react-hook-form';
import { get } from 'lodash';

import { InputComponentType } from './types';

import useAppColors from 'hooks/useAppColors';
import { FormDatum } from 'types/forms';

interface Props<T> extends FormDatum<T> {
  showLabel?: boolean;
  errors: UseFormReturn<T>['formState']['errors'];
  register: UseFormReturn<T>['register'];
  control: UseFormReturn<T>['control'];
}

const deriveComponent = (type?: string): InputComponentType => {
  switch (type) {
    case 'textarea':
      return Textarea;
    case 'select':
      return Select;
    case 'text':
    default:
      return Input;
  }
};

const FormField = <T,>({
  name,
  type,
  hidden,
  registerArgs,
  CustomComponent,
  label,
  options,
  extraProps,
  helperText,
  showLabel = true,
  isLoading,
  errors,
  register,
  control,
}: Props<T>) => {
  const { primary } = useAppColors();
  const InputComponent = deriveComponent(type);
  return hidden ? null : (
    <Stack key={name as string}>
      <FormControl id={name as string} isInvalid={!!get(errors, name) as any}>
        {showLabel && <FormLabel>{label}</FormLabel>}
        {CustomComponent ? (
          <Controller
            name={name as string}
            control={control as Control<FieldValues>}
            render={({ field }) => {
              return <CustomComponent {...field} {...extraProps} />;
            }}
          />
        ) : (
          <InputGroup>
            <InputComponent
              width="100%"
              focusBorderColor={primary}
              type={type}
              icon={isLoading ? <></> : undefined}
              {...register(name as any, { ...registerArgs })}
              {...extraProps}
            >
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </InputComponent>
            {isLoading && (
              <InputRightElement>
                <Box>
                  <Spinner color={primary} size="sm"></Spinner>
                </Box>
              </InputRightElement>
            )}
          </InputGroup>
        )}

        {helperText && (
          <FormHelperText color="grey" fontSize="sm">
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
      <ErrorMessage
        render={({ message }) => (
          <Text fontSize="sm" color="red.400">
            {message}
          </Text>
        )}
        name={name as any}
        errors={errors}
      ></ErrorMessage>
    </Stack>
  );
};

export default FormField;
