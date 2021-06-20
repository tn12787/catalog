import { Text, Image, Flex, Icon, Button } from '@chakra-ui/react';
import ReleaseStatusBadge from 'components/ReleaseStatusBadge';
import React from 'react';
import { FiCalendar, FiDisc, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  useFirestore,
  useFirestoreDocData,
} from 'reactfire';
import { Artwork } from 'types';

interface ReleaseCardProps {
  releaseData: any;
}

const ReleaseCard = ({ releaseData }: ReleaseCardProps) => {
  const artworkRef = useFirestore()
    .collection('artwork')
    .doc(releaseData.artwork ?? 'bogo');
  const { data } = useFirestoreDocData<Artwork>(artworkRef, {
    idField: 'id',
  });

  return (
    <Flex
      my={'11px'}
      overflow="hidden"
      alignItems="center"
      direction={['column', 'column', 'row']}
      bg="white"
      borderRadius={'13px'}
      width="100%"
      maxH={['auto', 'auto', '150px']}
    >
      <Image
        src={data?.url || 'https://semantic-ui.com/images/wireframe/image.png'}
        alt="this is an image"
        width={['100%', '100%', '150px']}
        height="150px"
        backgroundSize="cover"
        objectFit="cover"
      />
      <Flex width="100%" direction="column" p={5} py={1}>
        <Flex
          flex={1}
          align="center"
          direction={['column', 'column', 'row']}
          justify="space-between"
          py={1}
        >
          <Flex align="center" direction={['column', 'column', 'row']}>
            <Text
              pl={'2px'}
              fontSize="25px"
              color="charcoal"
              fontWeight="semibold"
              mr={2}
            >
              {releaseData.name}
            </Text>
            <ReleaseStatusBadge releaseData={releaseData} />
          </Flex>
          <Button
            py={'6px'}
            px={6}
            mt={[2, 2, 0]}
            as={Link}
            to={`/releases/${releaseData.id}`}
            height="auto"
            fontSize="15px"
            variant="outline"
            colorScheme="purple"
          >
            View Details
          </Button>
        </Flex>
        <Flex align="center" color="softCharcoal" my={1}>
          <Icon fontSize="22px" as={FiUser} mr={2} />
          <Text fontSize="14px">{releaseData.artist}</Text>
        </Flex>
        <Flex align="center" color="mist" my={1}>
          <Icon fontSize="22px" as={FiDisc} mr={2} />
          <Text fontSize="14px">{releaseData.type}</Text>
        </Flex>
        <Flex align="center" color="mist" my={1}>
          <Icon fontSize="22px" as={FiCalendar} mr={2} />
          <Text fontSize="14px">{releaseData.targetDate}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ReleaseCard;
