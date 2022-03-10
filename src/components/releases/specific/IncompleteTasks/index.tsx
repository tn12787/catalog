import {
  Stack,
  UnorderedList,
  Text,
  ListItem,
  LinkBox,
  HStack,
  LinkOverlay,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

import Card from 'components/Card';

const IncompleteTasks = () => {
  const alertBg = useColorModeValue('gray.200', 'gray.700');
  const linkColor = useColorModeValue('purple.500', 'blue.300');
  return (
    <Card bg={alertBg} fontSize="sm" spacing={3}>
      <Text>
        This release has incomplete task info. To release music to stores, you need to complete at
        least:
      </Text>
      <Stack>
        <UnorderedList>
          <ListItem>Artwork</ListItem>
          <ListItem>Distribution</ListItem>
          <ListItem>Mastering</ListItem>
        </UnorderedList>
      </Stack>
      <Text>For best results, you should enter info about those tasks here.</Text>
      <LinkBox as={HStack} color={linkColor}>
        <LinkOverlay
          isExternal
          href="https://blog.landr.com/everything-musicians-need-know-digital-music-distribution/"
        >
          <Text>Learn more about what you need for distribution.</Text>
        </LinkOverlay>
        <Icon as={FiExternalLink}></Icon>
      </LinkBox>
    </Card>
  );
};

export default IncompleteTasks;
