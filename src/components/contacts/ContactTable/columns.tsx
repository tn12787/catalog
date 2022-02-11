import { Wrap } from '@chakra-ui/react';
import { ContactLabel } from '@prisma/client';
import { CellProps, Column } from 'react-table';

import ContactLabelChip from '../ContactLabelChip';

import ContactMenu from './ContactMenu';

import { ContactWithLabels } from 'types/common';

function LabelList({ value }: CellProps<ContactWithLabels, ContactLabel[]>) {
  return (
    <Wrap>
      {value.map((label) => (
        <ContactLabelChip key={label.id} label={label} />
      ))}
    </Wrap>
  );
}

export const columns: Column<ContactWithLabels>[] = [
  {
    id: 'name',
    accessor: 'name',
    Header: 'Name',
  },
  {
    id: 'email',
    accessor: 'email',
    Header: 'Email',
  },
  {
    id: 'phone',
    accessor: 'phone',
    Header: 'Phone',
  },
  {
    id: 'labels',
    accessor: 'labels',
    Header: 'Labels',
    Cell: LabelList,
  },
  {
    Header: '',
    accessor: (d) => d,
    Cell: ContactMenu,
    id: 'actions',
    width: 25,
  },
];
