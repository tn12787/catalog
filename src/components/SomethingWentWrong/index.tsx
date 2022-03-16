import {
  Stack,
  Heading,
  Button,
  Text,
  Collapse,
  useDisclosure,
  HStack,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';

import useAppColors from 'hooks/useAppColors';

type Props = FallbackProps;

const SomethingWentWrong = ({ resetErrorBoundary, error }: Props) => {
  const { bgPrimary } = useAppColors();
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Stack align="center" w="100%" justify="center" direction="column">
      <Stack align="center" maxW="container.md" spacing={7}>
        <Stack align="center">
          <Heading>Oh no...</Heading>
          <Text>Something went wrong.</Text>
        </Stack>
        <Stack overflowX="auto" w="90%" fontSize="sm" rounded="lg" p={2} bg={bgPrimary}>
          <Text fontWeight={'semibold'}>Error message</Text>
          <Text as="pre" whiteSpace={'pre-wrap'}>
            {error.message}
          </Text>
          <HStack onClick={onToggle}>
            <Icon as={isOpen ? BiChevronDown : BiChevronRight}></Icon>
            <Text fontWeight={'semibold'}>Stack</Text>
          </HStack>
          <Collapse in={isOpen}>
            <Text as="pre" fontSize={'xs'} whiteSpace={'pre-wrap'}>
              {error.stack}
            </Text>
          </Collapse>
        </Stack>
        <Button colorScheme="purple" onClick={resetErrorBoundary}>
          Dismiss error
        </Button>
      </Stack>
    </Stack>
  );
};

export default SomethingWentWrong;
