import { CellProps, Column } from 'react-table';
import { Text } from '@chakra-ui/react';
import { Contact } from '@prisma/client';

import ContactLabelMenu from './ContactLabelMenu';

import { ContactLabelWithContacts } from 'types/common';
import ContactLabelChip from 'components/contacts/ContactLabelChip';
import useAppColors from 'hooks/useAppColors';
import { maybePluralize } from 'utils/words';

function ContactLabelCell({
  value,
}: CellProps<ContactLabelWithContacts, ContactLabelWithContacts>) {
  return <ContactLabelChip label={value} />;
}

function ContactCountCell({ value }: CellProps<ContactLabelWithContacts, Contact[] | undefined>) {
  const { bodySub } = useAppColors();
  return value?.length ?? 0 > 0 ? (
    <Text color={bodySub} fontSize={'xs'}>
      {value?.length} {maybePluralize(value?.length ?? 0, 'contact')} with this label
    </Text>
  ) : null;
}

export const columns: Column<ContactLabelWithContacts>[] = [
  {
    Header: (d) => (
      <Text>
        `${d.rows.length} ${maybePluralize(d.rows.length, 'label')}`
      </Text>
    ),
    id: 'name',
    accessor: (d) => d,
    Cell: ContactLabelCell,
  },
  {
    id: 'contacts',
    accessor: 'contacts',
    Cell: ContactCountCell,
    disableSortBy: true,
  },
  {
    accessor: (d) => d,
    Cell: ContactLabelMenu,
    id: 'actions',
    width: 25,
    disableSortBy: true,
  },
];
