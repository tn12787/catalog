import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { Artwork } from 'types';

interface Props {
  releaseData: any;
}

const HeaderSection = ({ releaseData }: Props) => {
  const artworkRef = useRef(
    useFirestore().collection('artwork').doc(releaseData.artwork)
  );
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>();

  const releaseRef = useRef(
    useFirestore().collection('releases').doc(releaseData.id)
  );

  const { data: artworkData } = useFirestoreDocData<Artwork>(
    artworkRef.current
  );

  const onDelete = async () => {
    try {
      await releaseRef.current.delete();
      toast({
        status: 'success',
        title: 'Deleted',
        description: 'Your release was deleted successfully.',
      });
    } catch (error) {
      toast({
        status: 'error',
        title: 'Oh no...',
        description: error.toString(),
      });
    } finally {
    }
  };

  return (
    <Flex
      width={['100%', '100%', '90%']}
      maxWidth={'900px'}
      flex={1}
      direction="column"
    >
      <Flex position="relative" overflow="hidden">
        <Image
          filter="blur(5px)"
          transform={'scale(1.05)'}
          maxH="200px"
          objectFit="cover"
          width="100%"
          src={
            artworkData?.url ||
            'https://semantic-ui.com/images/wireframe/image.png'
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
      <Flex align="center" justify="space-between">
        <HStack
          alignItems="center"
          w={['90%', '90%', '100%']}
          margin={['0 auto']}
        >
          <HStack alignItems="center">
            <Icon as={FiArrowLeft} />
            <Text fontSize="sm" as={Link} to={'/releases'}>
              Back
            </Text>
          </HStack>
          <Heading>{releaseData.name}</Heading>
        </HStack>
        <Button colorScheme="red" onClick={onOpen}>
          Delete
        </Button>
      </Flex>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Remove Release?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete your release? This change cannot be
            undone.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef as any} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={onDelete}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
};

export default HeaderSection;
