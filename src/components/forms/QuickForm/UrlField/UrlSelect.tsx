import { Button, Input, Stack, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void | Promise<void>;
};

const UrlSelect = ({ value, onChange }: Props) => {
  const [localValue, setLocalValue] = React.useState(value);
  return (
    <Stack p={1} px={2} alignItems={'flex-start'} w="100%">
      <Text fontSize="sm" fontWeight={'semibold'}>
        Edit URL
      </Text>
      <Stack>
        <Input
          borderRadius="md"
          size="sm"
          defaultValue={value}
          onChange={(e) => setLocalValue(e.target.value)}
        />
        <Button size="sm" onClick={() => onChange(localValue)}>
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default UrlSelect;
