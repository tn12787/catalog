import { List, ListProps } from '@chakra-ui/layout';
import React from 'react';

import useAppColors from 'hooks/useAppColors';

interface Props extends ListProps {
  isOpen?: boolean;
}

const RoleSelectList = React.forwardRef(({ isOpen, ...rest }: Props, ref) => {
  const { bgSecondary, border } = useAppColors();
  return isOpen ? (
    <List
      ref={ref as any}
      position="absolute"
      bg={bgSecondary}
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
});

RoleSelectList.displayName = 'RoleSelectList';

export default RoleSelectList;
