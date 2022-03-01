import { Input } from '@chakra-ui/input';
import { InputGroup, IconButton, HStack, FormControl } from '@chakra-ui/react';
import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { BiRefresh } from 'react-icons/bi';

import useAppColors from 'hooks/useAppColors';
import { shouldBeDark } from 'utils/color';

interface Props extends Pick<ControllerRenderProps, 'onChange'> {
  value: string;
}

const ColorField: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  ({ value, onChange }: Props, ref) => {
    const { primary, border } = useAppColors();

    const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    return (
      <FormControl>
        <HStack>
          <IconButton
            onClick={() => onChange(generateRandomColor())}
            bg={value ?? 'gray.400'}
            fontSize="xl"
            variant="ghost"
            color={shouldBeDark(value ?? 'lightGray') ? 'gray.900' : 'white'}
            aria-label="Generate random color"
            icon={<BiRefresh />}
          />
          <InputGroup borderRadius="md" w="full">
            <Input
              ref={ref}
              placeholder="Search for a user..."
              borderColor={border}
              value={value}
              focusBorderColor={primary}
              onChange={(e) => onChange(e.target.value)}
            />
          </InputGroup>
        </HStack>
      </FormControl>
    );
  }
);

ColorField.displayName = 'ColorPicker';

export default ColorField;
