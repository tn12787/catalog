import { Flex, FlexProps, ThemingProps, useRadioGroup, UseRadioGroupProps } from '@chakra-ui/react';
import React from 'react';

import InnerRadioButton from './InnerRadioButton';

import useAppColors from 'hooks/useAppColors';

type Props = FlexProps &
  UseRadioGroupProps & {
    options: { label: string; value: string }[];
    size?: ThemingProps<'InnerRadioButton'>['size'];
  };

const InnerRadioGroup = ({ size, onChange, value, defaultValue, options, ...rest }: Props) => {
  const { getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: defaultValue ?? options?.[0].value,
    onChange,
    value,
  });
  const { bgPrimary } = useAppColors();
  return (
    <Flex
      display="inline-flex"
      align="center"
      p={1}
      rounded="lg"
      bg={bgPrimary}
      {...getRootProps(rest)}
    >
      {options.map((option) => (
        <InnerRadioButton
          size={size}
          key={option.value}
          {...getRadioProps({ value: option.value })}
        >
          {option.label}
        </InnerRadioButton>
      ))}
    </Flex>
  );
};

export default InnerRadioGroup;
