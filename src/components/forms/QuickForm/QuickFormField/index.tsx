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
  labelRightContent?: React.ReactNode;
  renderValue?: ({ value }: { value: T }) => JSX.Element;
  onSubmit: (value: any) => void | Promise<void>;
  renderEditing: ({ value, onChange }: any) => JSX.Element;
  isDisabled?: boolean;
};

const QuickFormField = <T extends FieldValues>({
  fieldName,
  value,
  renderValue,
  onSubmit,
  labelRightContent,
  renderEditing,
  isDisabled,
}: Props<T>) => {
  const { primary, bgSecondary } = useAppColors();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const onChange = async (value: T) => {
    onSubmit(value);
    onClose();
  };

  return (
    <Stack>
      <Popover isLazy isOpen={isOpen && !isDisabled} onClose={onClose} onOpen={onOpen}>
        <PopoverTrigger>
          <HStack
            as={!isDisabled ? Button : Stack}
            fontSize="sm"
            fontWeight={'bold'}
            _hover={!isDisabled ? { color: primary } : undefined}
            justifyContent={'space-between'}
            variant="unstyled"
            onClick={onOpen}
            h="auto"
          >
            <HStack>
              <Text textTransform={'capitalize'}>{fieldName}</Text>
              {labelRightContent}
            </HStack>
            {!isDisabled && <Icon as={FiEdit} />}
          </HStack>
        </PopoverTrigger>
        {renderValue ? renderValue({ value }) : <Box>{value?.toString()}</Box>}
        <PopoverContent bg={bgSecondary} w="auto" as={Stack} spacing={0}>
          <PopoverArrow bg={bgSecondary} />
          {renderEditing({ value, onChange })}
        </PopoverContent>
      </Popover>
    </Stack>
  );
};

export default QuickFormField;
