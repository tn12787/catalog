import {
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

import DeleteReleaseDialog from '../DeleteReleaseDialog';

import { EnrichedRelease } from 'types';
import { hasRequiredPermissions } from 'utils/auth';
import useExtendedSession from 'hooks/useExtendedSession';
import useAppColors from 'hooks/useAppColors';

interface Props {
  releaseData: EnrichedRelease;
}

const HeaderSection = ({ releaseData }: Props) => {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { bgPrimary } = useAppColors();

  const { teams, currentTeam } = useExtendedSession();

  const canDeleteRelease = hasRequiredPermissions(['DELETE_RELEASES'], teams?.[currentTeam]);

  return (
    <Stack width={['100%', '100%', '90%']} maxWidth={'container.lg'}>
      <Flex position="relative" overflow="hidden">
        <Image
          filter="blur(5px)"
          transform={'scale(1.05)'}
          maxH="200px"
          objectFit="cover"
          width="100%"
          alt="album art"
          src={releaseData.artwork?.url || 'https://semantic-ui.com/images/wireframe/image.png'}
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
      <Flex pb={3} align="center" justify="space-between">
        <HStack alignItems="center" w={['90%', '90%', '100%']} margin={['0 auto']}>
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
      <DeleteReleaseDialog
        onConfirm={() => {
          onClose();
          router.push('/releases');
        }}
        isOpen={isOpen}
        onCancel={onClose}
        onClose={onClose}
        releaseData={releaseData}
      />
    </Stack>
  );
};

export default HeaderSection;
