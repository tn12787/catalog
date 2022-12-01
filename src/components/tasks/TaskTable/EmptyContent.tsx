import { Stack, Tbody, Tr, Td, Text } from '@chakra-ui/react';
import React from 'react';

import useAppColors from 'hooks/useAppColors';

type Props = { iconText: JSX.Element; message: JSX.Element };

const EmptyTableContent = ({ iconText, message }: Props) => {
  const { bodySub } = useAppColors();
  return (
    <Stack as={Tbody} py={8} alignItems="center" w="100%" alignSelf="center">
      <Tr>
        <Td p={1} borderBottom={'none'}>
          <Text as="span" fontSize="2xl">
            {iconText}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td p={1} borderBottom={'none'}>
          <Text as="span" color={bodySub}>
            {message}
          </Text>
        </Td>
      </Tr>
    </Stack>
  );
};

export default EmptyTableContent;
