import {
  Text,
  HStack,
  Stack,
  Button,
  Icon,
  Box,
  PopoverProps,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { TaskStatus } from '@prisma/client';

import useAppColors from 'hooks/useAppColors';
import { ReleaseTaskWithAssignees, TeamMemberWithUser } from 'types/common';

type FieldValues = string | TaskStatus | string[] | TeamMemberWithUser[] | undefined;

type Props<T extends FieldValues> = PopoverProps & {
  field: keyof ReleaseTaskWithAssignees;
  value: T;
  renderValue?: ({ value }: any) => JSX.Element;
  onSubmit: (value: T) => void | Promise<void>;
  renderEditing: ({ value, onChange }: any) => JSX.Element;
};

const QuickFormField = <T extends FieldValues>({
  field,
  value,
  renderValue,
  onSubmit,
  renderEditing,
}: Props<T>) => {
  const { primary, bgSecondary } = useAppColors();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const onChange = async (value: T) => {
    await onSubmit(value);
    onClose();
  };

  return (
    <Stack>
      <Popover isLazy isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        <PopoverTrigger>
          <HStack
            as={Button}
            fontSize="sm"
            fontWeight={'bold'}
            _hover={{ color: primary }}
            justifyContent={'space-between'}
            variant="unstyled"
            onClick={onOpen}
            h="auto"
          >
            <Text textTransform={'capitalize'}>{field}</Text>
            <Icon as={FiEdit} />
          </HStack>
        </PopoverTrigger>
        {renderValue ? renderValue({ value }) : <Box>{value}</Box>}
        <PopoverContent bg={bgSecondary} w="auto" as={Stack}>
          <PopoverArrow />
          {renderEditing({ value, onChange })}
        </PopoverContent>
      </Popover>
    </Stack>
  );
};

export default QuickFormField;
