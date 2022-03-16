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
  Heading,
} from '@chakra-ui/react';
import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

import Card from 'components/Card';

const NewReleaseAlert = () => {
  const alertBg = useColorModeValue('blue.50', 'gray.900');
  const alertBorder = useColorModeValue('blue.400', 'blue.600');
  const linkColor = useColorModeValue('purple.500', 'blue.300');
  return (
    <Card bg={alertBg} borderLeft="3px solid" borderColor={alertBorder} fontSize="sm" spacing={3}>
      <Heading size="md">More info needed</Heading>
      <Text>{"To release music to stores, you'll need:"}</Text>
      <Stack>
        <UnorderedList>
          <ListItem>Mastering</ListItem>
          <ListItem>Artwork</ListItem>
          <ListItem>Distribution</ListItem>
        </UnorderedList>
      </Stack>
      <LinkBox as={HStack} color={linkColor}>
        <LinkOverlay
          isExternal
          href="https://twostorymelody.com/how-to-release-music-tips-and-strategies"
        >
          <Text>Learn more about what you need to release music.</Text>
        </LinkOverlay>
        <Icon as={FiExternalLink}></Icon>
      </LinkBox>
      <Text>
        {
          'Capture information about these tasks below, to make sure you get everything done in time.'
        }
      </Text>
    </Card>
  );
};

export default NewReleaseAlert;
