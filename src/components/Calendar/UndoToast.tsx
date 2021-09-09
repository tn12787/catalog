import { Button, Text } from '@chakra-ui/react';
import { Stack, HStack } from '@chakra-ui/layout';
import useAppColors from 'hooks/useAppColors';
import React from 'react';

interface Props {
  onUndo: () => void;
  onClose: () => void;
}

const UndoToast = ({ onClose, onUndo }: Props) => {
  const { border } = useAppColors();
  return (
    <Stack>
      <HStack
        alignSelf="center"
        bg={'gray.900'}
        py={1}
        border="1px solid"
        px={2}
        borderColor={border}
        boxShadow="xl"
        borderRadius="md"
      >
        <Text color="white">{'Event updated'}</Text>
        <Text>✨</Text>
        <Button
          onClick={() => {
            onClose();
            onUndo();
          }}
          textDecoration="underline"
          size="xs"
          variant="link"
          color="white"
          fontWeight="normal"
        >
          Undo
        </Button>
      </HStack>
    </Stack>
  );
};

export default UndoToast;
