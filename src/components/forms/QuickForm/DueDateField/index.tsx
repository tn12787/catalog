import React from 'react';
import { Box } from '@chakra-ui/react';
import { format } from 'date-fns';

import QuickFormField from '../QuickFormField';

import DueDateSelect from './DueDateSelect';

type Props = {
  date: Date | string;
  onChange: (value: Date | string) => void | Promise<void>;
};

const DueDateField = ({ date, onChange }: Props) => {
  return (
    <QuickFormField
      fieldName="Due Date"
      value={new Date(date)}
      renderValue={({ value }) => {
        return <Box>{format(new Date(value ?? Date.now()), 'PP')}</Box>;
      }}
      onSubmit={onChange}
      renderEditing={DueDateSelect}
    />
  );
};

export default DueDateField;
