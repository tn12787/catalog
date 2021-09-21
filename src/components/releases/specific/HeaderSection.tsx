import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link as ChakraLink,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';

import { deleteSingleRelease } from 'queries/releases';
import { EnrichedRelease } from 'types';
import { hasRequiredPermissions } from 'utils/auth';
import useExtendedSession from 'hooks/useExtendedSession';
import useAppColors from 'hooks/useAppColors';

interface Props {
  releaseData: EnrichedRelease;
}

const HeaderSection = ({ releaseData }: Props) => {
  const toast = useToast();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>();

  const queryClient = useQueryClient();
  const { mutateAsync: deleteRelease, isLoading } = useMutation(
    deleteSingleRelease,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['releases']);
      },
    }
  );

  const { bgPrimary } = useAppColors();

  const { teams, currentTeam } = useExtendedSession();

  const canDeleteRelease = hasRequiredPermissions(
    ['DELETE_RELEASES'],
    teams?.[currentTeam]
  );

  const onDelete = async () => {
    try {
      await deleteRelease(releaseData.id);
      toast({
        status: 'success',
        title: 'Deleted',
        description: 'Your release was deleted successfully.',
      });
      onClose();
      router.push(`/releases`);
    } catch (error: any) {
      toast({
        status: 'error',
        title: 'Oh no...',
        description: error.toString(),
      });
    }
  };

  return (
    <Stack
      width={['100%', '100%', '90%']}
      maxWidth={'container.lg'}
    >
      <Flex position="relative" overflow="hidden">
        <Image
          filter="blur(5px)"
          transform={'scale(1.05)'}
          maxH="200px"
          objectFit="cover"
          width="100%"
          alt="album art"
          src={
            releaseData.artwork?.url ||
            'https://semantic-ui.com/images/wireframe/image.png'
          }
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          height={'100%'}
          width="100%"
          bgGradient={`linear(to-b, transparent, ${bgPrimary})`}
        ></Box>
      </Flex>
      <Flex align="center" justify="space-between">
        <HStack
          alignItems="center"
          w={['90%', '90%', '100%']}
          margin={['0 auto']}
        >
          <HStack alignItems="center">
            <Icon as={FiArrowLeft} />
            <Link href="/releases" passHref>
              <ChakraLink>
                <Text fontSize="sm">Back</Text>
              </ChakraLink>
            </Link>
          </HStack>
          <Heading>{releaseData.name}</Heading>
        </HStack>
        {canDeleteRelease && (
          <Button colorScheme="red" onClick={onOpen}>
            Delete
          </Button>
        )}
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
            <Button
              colorScheme="red"
              isLoading={isLoading}
              ml={3}
              onClick={onDelete}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Stack>
  );
};

export default HeaderSection;
