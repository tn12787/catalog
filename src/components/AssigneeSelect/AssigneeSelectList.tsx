import { List, ListProps } from '@chakra-ui/layout';
import React from 'react';

import useAppColors from 'hooks/useAppColors';

interface Props extends ListProps {
  isOpen?: boolean;
}

const AssigneeSelectList = ({ isOpen, ...rest }: Props) => {
  const { bgPrimary, border } = useAppColors();
  return isOpen ? (
    <List
      position="absolute"
      bg={bgPrimary}
      top="40px"
      zIndex="1"
      flex={1}
      overflowY="auto"
      p={2}
      w="100%"
      border="1px solid"
      borderColor={border}
      borderRadius="md"
      shadow={'md'}
      {...rest}
    />
  ) : null;
};

export default AssigneeSelectList;
