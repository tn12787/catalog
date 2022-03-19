import {
  useRadio,
  Box,
  UseRadioProps,
  Center,
  Text,
  useStyleConfig,
  ThemingProps,
} from '@chakra-ui/react';
import React from 'react';

import ActiveIndicator from './ActiveIndicator';

import useAppColors from 'hooks/useAppColors';

type Props = UseRadioProps & {
  size?: ThemingProps<'InnerRadioButton'>['size'];
};

const InnerRadioButton: React.FC<Props> = ({ size, ...props }) => {
  const { getInputProps, getLabelProps, getCheckboxProps, state } = useRadio(props);
  const { primary, bodySub, bgSecondary } = useAppColors();
  const styles = useStyleConfig('InnerRadioButton', { size: size as any });

  return (
    <Box as="label" {...getLabelProps()}>
      <input {...getInputProps()} />
      <Center {...getCheckboxProps()} __css={styles} pos="relative" zIndex={1}>
        <Text color={state.isChecked ? primary : bodySub} zIndex={'tooltip'}>
          {props.children}
        </Text>
        {state.isChecked && (
          <ActiveIndicator
            bg={bgSecondary}
            shadow="md"
            layoutId="highlight"
            transition={{ duration: '0.1' }}
          />
        )}
      </Center>
    </Box>
  );
};

export default InnerRadioButton;
