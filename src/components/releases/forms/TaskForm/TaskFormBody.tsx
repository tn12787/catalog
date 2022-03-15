import { Stack, Button, ButtonGroup, HStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { addDays, format, startOfDay } from 'date-fns';

import { buildTaskConfig } from './taskConfig';
import { TaskFormData } from './types';

import FormContent from 'components/forms/FormContent';
import { FormBodyProps } from 'types/forms';
import { ReleaseTaskWithAssignees } from 'types/common';

interface Props extends FormBodyProps<TaskFormData> {
  existingData?: ReleaseTaskWithAssignees;
  generic?: boolean;
}

const baseEmojiRegex =
  '[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]';

const emojiRegex = new RegExp(`(${baseEmojiRegex}+)(.*)`, 'u');

const TaskFormBody = ({ onSubmit, loading, existingData, generic }: Props) => {
  const properDateFormat = useMemo(() => {
    const existingDate = existingData?.dueDate ?? addDays(startOfDay(new Date()), 7);
    return format(new Date(existingDate), 'yyyy-MM-dd');
  }, [existingData?.dueDate]);

  const { emoji, nameText } = useMemo(() => {
    if (!existingData?.name) return { emoji: '', nameText: '' };

    const defaultReturn = { emoji: '', nameText: existingData.name };

    const startsWithEmoji = emojiRegex.test(existingData.name);
    if (!startsWithEmoji) {
      return defaultReturn;
    }

    const [, emoji, stringValue] = emojiRegex.exec(existingData.name) ?? [];
    return { emoji, nameText: stringValue?.trimStart() } ?? defaultReturn;
  }, [existingData]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<TaskFormData>({
    defaultValues: {
      ...existingData,
      dueDate: properDateFormat as any,
      name: { emoji: emoji, text: nameText },
    },
  });

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack spacing={3} width="100%" maxW="600px" margin="0 auto">
        <FormContent
          config={buildTaskConfig(generic ?? false)}
          control={control}
          errors={errors}
          register={register}
        />
        <HStack justify="flex-end">
          <ButtonGroup>
            <Button
              colorScheme="purple"
              flexGrow={0}
              rightIcon={<FiSave />}
              isLoading={loading}
              type="submit"
            >
              Save
            </Button>
          </ButtonGroup>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default React.memo<Props>(TaskFormBody);
