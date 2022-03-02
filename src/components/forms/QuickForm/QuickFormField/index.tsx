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
import { Distributor, TaskStatus } from '@prisma/client';

import useAppColors from 'hooks/useAppColors';
import { ContactWithLabels, WorkspaceMemberWithUser } from 'types/common';

type FieldValues =
  | string
  | TaskStatus
  | string[]
  | WorkspaceMemberWithUser[]
  | ContactWithLabels[]
  | Date
  | Distributor
  | undefined;

type Props<T extends FieldValues> = PopoverProps & {
  fieldName: string;
  value: T;
  renderValue?: ({ value }: { value: T }) => JSX.Element;
  onSubmit: (value: T) => void | Promise<void>;
  renderEditing: ({ value, onChange }: any) => JSX.Element;
};

const QuickFormField = <T extends FieldValues>({
  fieldName,
  value,
  renderValue,
  onSubmit,
  renderEditing,
}: Props<T>) => {
  const { primary, bgSecondary } = useAppColors();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const onChange = async (value: T) => {
    onSubmit(value);
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
            <Text textTransform={'capitalize'}>{fieldName}</Text>
            <Icon as={FiEdit} />
          </HStack>
        </PopoverTrigger>
        {renderValue ? renderValue({ value }) : <Box>{value}</Box>}
        <PopoverContent bg={bgSecondary} w="auto" as={Stack} spacing={0}>
          <PopoverArrow bg={bgSecondary} />
          {renderEditing({ value, onChange })}
        </PopoverContent>
      </Popover>
    </Stack>
  );
};

export default QuickFormField;
