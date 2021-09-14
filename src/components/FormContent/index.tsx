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
import {
  DeepMap,
  FieldError,
  FieldName,
  UseFormMethods,
} from 'react-hook-form';
import {
  ErrorMessage,
  FieldValuesFromFieldErrors,
} from '@hookform/error-message';

import useAppColors from 'hooks/useAppColors';
import { FormDatum } from 'types/forms';

interface Props<T> extends StackProps {
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

const FormContent = <T extends any>({
  errors,
  config,
  register,
  ...rest
}: Props<T>) => {
  const { primary } = useAppColors();
  return (
    <Stack py={6} spacing={6} width="100%" margin="0 auto" {...rest}>
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
              <FormControl id={name as string} isInvalid={!!errors[name]}>
                <FormLabel>{label}</FormLabel>
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
                  name as FieldName<
                    FieldValuesFromFieldErrors<DeepMap<T, FieldError>>
                  >
                }
                errors={errors}
              ></ErrorMessage>
            </Stack>
          );
        }
      )}
    </Stack>
  );
};

export default FormContent;
