import { Stack, Button, ButtonGroup, HStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { FiSave } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { addDays, format, startOfDay } from 'date-fns';

import { buildTaskConfig } from './taskConfig';

import FormContent from 'components/forms/FormContent';
import { FormBodyProps } from 'types/forms';
import { ClientRelease, ReleaseTaskWithAssignees } from 'types/common';

interface Props<T> extends FormBodyProps<T> {
  existingData?: T;
  release: ClientRelease;
}

const TaskFormBody = ({
  onSubmit,
  loading,
  existingData,
  release,
}: Props<ReleaseTaskWithAssignees>) => {
  const properDateFormat = useMemo(() => {
    const existingDate = existingData?.dueDate ?? addDays(startOfDay(new Date()), 7);
    return format(new Date(existingDate), 'yyyy-MM-dd');
  }, [existingData?.dueDate]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ReleaseTaskWithAssignees>({
    defaultValues: { ...existingData, dueDate: properDateFormat as any },
  });

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} width="100%">
      <Stack spacing={3} width="100%" maxW="600px" margin="0 auto">
        <FormContent
          config={buildTaskConfig(release?.targetDate as Date)}
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

export default React.memo<Props<ReleaseTaskWithAssignees>>(TaskFormBody);
