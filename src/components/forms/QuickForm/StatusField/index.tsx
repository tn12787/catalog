import { TaskStatus } from '@prisma/client';
import React from 'react';
import { Box } from '@chakra-ui/react';

import QuickFormField from '../QuickFormField';

import StatusSelect from './StatusSelect';

import TaskStatusBadge from 'components/tasks/TaskStatusBadge';

type Props = {
  status: TaskStatus;
  onChange: (value: TaskStatus) => void | Promise<void>;
};

const StatusField = ({ status, onChange }: Props) => {
  console.log(status);
  return (
    <QuickFormField
      field="status"
      value={status}
      renderValue={({ value }) => (
        <Box>
          <TaskStatusBadge status={value} />
        </Box>
      )}
      onSubmit={onChange}
      renderEditing={StatusSelect}
    />
  );
};

export default StatusField;
