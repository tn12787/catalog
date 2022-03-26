import { Stack, Button, ButtonGroup, HStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

import { buildTaskConfig } from './taskConfig';
import { TaskFormData } from './types';
import { deriveEmojiValueData } from './utils';

import FormContent from 'components/forms/FormContent';
import { FormBodyProps } from 'types/forms';
import { ReleaseTaskWithAssignees } from 'types/common';
import { defaultTaskDueDate } from 'utils/tasks';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

interface Props extends FormBodyProps<TaskFormData> {
  existingData?: ReleaseTaskWithAssignees;
  generic?: boolean;
}

const TaskFormBody = ({ onSubmit, loading, existingData, generic }: Props) => {
  const properDateFormat = useMemo(() => {
    const existingDate = existingData?.dueDate ?? defaultTaskDueDate();
    return format(new Date(existingDate), 'yyyy-MM-dd');
  }, [existingData?.dueDate]);

  const { workspace } = useCurrentWorkspace();

  const mappedTaskName = useMemo(() => deriveEmojiValueData(existingData?.name), [existingData]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<TaskFormData>({
    defaultValues: {
      ...existingData,
      dueDate: properDateFormat as any,
      name: mappedTaskName,
    },
  });

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack spacing={3} width="100%" maxW="600px" margin="0 auto">
        <FormContent
          config={buildTaskConfig(generic ?? false, workspace)}
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
