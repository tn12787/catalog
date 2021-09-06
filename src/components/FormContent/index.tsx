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
} from '@chakra-ui/react';
import React from 'react';
import { FormDatum } from 'types/forms';
import { FieldError, FieldErrors, UseFormMethods } from 'react-hook-form';

interface Props<T> {
  config: FormDatum<T>[];
  register: UseFormMethods<T>['register'];
  errors: UseFormMethods<T>['errors'];
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

const FormContent = <T extends any>({ errors, config, register }: Props<T>) => {
  return (
    <Stack py={6} spacing={6} width="100%" maxW="500px" margin="0 auto">
      {config.map(
        ({
          name,
          type,
          hidden,
          registerArgs,
          label,
          options,
          extraProps,
          helperText,
          isLoading,
        }: FormDatum<T>) => {
          const InputComponent = deriveComponent(type);
          return hidden ? null : (
            <Stack key={name as string}>
              <Text fontSize="md" fontWeight="semibold">
                {label}
              </Text>
              <InputGroup>
                <InputComponent
                  width="100%"
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
                      <Spinner  size="sm"></Spinner>
                    </Box>
                  </InputRightElement>
                )}
              </InputGroup>

              {helperText && (
                <Text color="grey" fontSize="sm">
                  {helperText}
                </Text>
              )}
              <Text color="red.400">
                {(errors[name] as FieldError)?.message}
              </Text>
            </Stack>
          );
        }
      )}
    </Stack>
  );
};

export default FormContent;
