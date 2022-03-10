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
  const alertBg = useColorModeValue('green.100', 'green.800');
  const linkColor = useColorModeValue('purple.500', 'blue.300');
  return (
    <Card bg={alertBg} fontSize="sm" spacing={3}>
      <Heading size="md">✅ Congrats</Heading>
      <Text>Your new release has been created!</Text>
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
          <Text>Learn more about what you need for distribution.</Text>
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
