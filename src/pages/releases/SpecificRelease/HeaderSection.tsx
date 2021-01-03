import { Flex, Heading, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { Artwork } from 'types';

interface Props {
  releaseData: any;
}

const HeaderSection = ({ releaseData }: Props) => {
  const artworkRef = useFirestore()
    .collection('artwork')
    .doc(releaseData.artwork);

  const { data } = useFirestoreDocData(artworkRef);
  const artwork: Artwork = data as Artwork;

  return (
    <Flex width="100%" flex={1} direction="column">
      <Flex position="relative" overflow="hidden">
        <Image
          filter="blur(5px)"
          transform={'scale(1.05)'}
          maxH="200px"
          objectFit="cover"
          width="100%"
          src={
            artwork?.url || 'https://semantic-ui.com/images/wireframe/image.png'
          }
        />
        <Flex
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          height={'100%'}
          width="100%"
          background={
            'linear-gradient(to bottom,  rgba(255,255,255,0) 0%,#eee 100%)'
          }
        ></Flex>
      </Flex>
      <Flex align="center">
        <Flex align="center">
          <Icon as={FiArrowLeft} mr={1} />
          <Text fontSize="sm" as={Link} mr={4} to={'/releases'}>
            Back
          </Text>
        </Flex>
        <Heading>{releaseData.name}</Heading>
      </Flex>
    </Flex>
  );
};

export default HeaderSection;
