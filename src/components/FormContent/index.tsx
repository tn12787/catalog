import {
  Input,
  Textarea,
  Select,
  Stack,
  Text,
  ComponentWithAs,
} from '@chakra-ui/react';
import React from 'react';
import { FormDatum } from 'types/forms';

interface Props<T> {
  config: FormDatum<T>[];
  register: (...args: any[]) => any;
  errors: any;
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
          registerArgs,
          label,
          options,
          extraProps,
          helperText,
        }: FormDatum<T>) => {
          const InputComponent = deriveComponent(type);
          return (
            <Stack key={name as string}>
              <Text fontSize="md" fontWeight="semibold">
                {label}
              </Text>
              <InputComponent
                width="100%"
                isInvalid={!!errors[name]}
                name={name as string}
                type={type}
                ref={register({ ...registerArgs })}
                {...extraProps}
              >
                {options?.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </InputComponent>

              {helperText && (
                <Text color="grey" fontSize="sm">
                  {helperText}
                </Text>
              )}
              <Text color="red.400">{errors[name]?.message}</Text>
            </Stack>
          );
        }
      )}
    </Stack>
  );
};

export default FormContent;
