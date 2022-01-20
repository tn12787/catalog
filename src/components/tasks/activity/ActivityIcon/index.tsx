import { Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

import useAppColors from 'hooks/useAppColors';

interface Props {
  icon: IconType;
}

const ActivityIcon = ({ icon }: Props) => {
  const { bodySub } = useAppColors();
  const bg = useColorModeValue('gray.300', 'gray.600');
  return (
    <Flex borderRadius={'full'} bg={bg} p={1}>
      <Icon fontSize="xl" color={bodySub} as={icon} />
    </Flex>
  );
};

export default ActivityIcon;
