import { Wrap, Text } from '@chakra-ui/react';
import React from 'react';

import ContactBadge from '.';

import useAppColors from 'hooks/useAppColors';
import { ContactWithLabels } from 'types/common';

interface Props {
  contacts: ContactWithLabels[];
  inline?: boolean;
}

const ContactBadgeList = ({ contacts, inline }: Props) => {
  const { bodySub } = useAppColors();
  return (
    <Wrap>
      {contacts?.length ? (
        contacts?.map((contact) => (
          <ContactBadge inline={inline} key={contact.id} contact={contact} />
        ))
      ) : (
        <Text fontSize="xs" color={bodySub}>
          No contacts assigned
        </Text>
      )}
    </Wrap>
  );
};

export default ContactBadgeList;
