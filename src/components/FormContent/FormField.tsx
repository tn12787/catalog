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
  ComponentWithAs,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import {
  ErrorMessage,
  FieldValuesFromFieldErrors,
} from '@hookform/error-message';
import React from 'react';
import {
  FieldName,
  DeepMap,
  FieldError,
  UseFormMethods,
} from 'react-hook-form';

import useAppColors from 'hooks/useAppColors';
import { FormDatum } from 'types/forms';

interface Props<T> extends FormDatum<T> {
  showLabel?: boolean;
  errors: UseFormMethods<T>['errors'];
  register: UseFormMethods<T>['register'];
}

interface SelectOption {
  label: string;
  value: string;
}

type InputComponentType = ComponentWithAs<any, any>;

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

const FormField = <T extends any>({
  name,
  type,
  hidden,
  registerArgs,
  label,
  options,
  extraProps,
  helperText,
  showLabel = true,
  isLoading,
  errors,
  register,
}: Props<T>) => {
  const { primary } = useAppColors();
  const InputComponent = deriveComponent(type);
  return hidden ? null : (
    <Stack key={name as string}>
      <FormControl id={name as string} isInvalid={!!errors[name]}>
        {showLabel && <FormLabel>{label}</FormLabel>}
        <InputGroup>
          <InputComponent
            width="100%"
            focusBorderColor={primary}
            isInvalid={!!errors[name]}
            name={name as string}
            type={type}
            icon={isLoading ? <></> : undefined}
            ref={register({ ...registerArgs })}
            {...extraProps}
          >
            {options?.map((option: SelectOption) => (
              <option key={option.label} value={option.value}>
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
        name={
          name as FieldName<FieldValuesFromFieldErrors<DeepMap<T, FieldError>>>
        }
        errors={errors}
      ></ErrorMessage>
    </Stack>
  );
};

export default FormField;
