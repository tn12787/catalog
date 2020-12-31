import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Text, Heading, Box, Image } from '@chakra-ui/react';
import React from 'react';

interface ReleaseCard {
    title: string
    artist: string
    targetDate: string
    desc?: string
    img?: string
  }

export const ReleaseCard = ({ title, desc, img, artist, targetDate }: ReleaseCard) =>
  // TODO: Get these aligning properly
  <Box alignItems="baseline">
    <Box>
      <Image src={img} alt="this is an image" boxSize="100px"></Image>
    </Box>
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="x2">{title}</Heading>
      <InfoOutlineIcon/><Text mt={4}>{artist}</Text>
      <InfoOutlineIcon/><Text mt={4}>{desc}</Text>
      <InfoOutlineIcon/><Text mt={4}>{targetDate}</Text>
    </Box>
  </Box>