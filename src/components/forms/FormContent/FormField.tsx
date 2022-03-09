import {
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Box,
  Spinner,
  FormHelperText,
  Input,
  Textarea,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import React from 'react';
import { UseFormReturn, FieldValues, Controller, Control, FieldError } from 'react-hook-form';
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
  helperContent: helperText,
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
      <FormControl
        isRequired={!!registerArgs?.required}
        id={name as string}
        isInvalid={!!get(errors, name) as any}
      >
        {showLabel && <FormLabel fontSize={'sm'}>{label}</FormLabel>}
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
              {options?.map((option, index) => (
                <option key={`${option.label}_select_${index}`} value={option.value}>
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
        <FormErrorMessage>
          {(errors as Record<keyof T, FieldError>)?.[name]?.message}
        </FormErrorMessage>
        {helperText && (
          <FormHelperText color="grey" fontSize="sm">
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Stack>
  );
};

export default FormField;
