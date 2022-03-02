import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';

import DeleteReleaseDialog from '../DeleteReleaseDialog';

import { ClientRelease } from 'types/common';
import { hasRequiredPermissions } from 'utils/auth';
import useExtendedSession from 'hooks/useExtendedSession';
import useAppColors from 'hooks/useAppColors';

interface Props {
  releaseData: ClientRelease;
}

const HeaderSection = ({ releaseData }: Props) => {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { bgPrimary } = useAppColors();

  const { workspaces, currentWorkspace } = useExtendedSession();

  const canDeleteRelease = hasRequiredPermissions(
    ['DELETE_RELEASES'],
    workspaces?.[currentWorkspace]
  );

  const artworkUrl = releaseData.artwork?.url;

  return (
    <Stack width={['100%', '100%', '90%']} maxWidth={'container.lg'} alignItems="center">
      <Flex position="relative" overflow="hidden" w="100%">
        <Image
          filter="blur(5px)"
          transform={'scale(1.05)'}
          maxH="200px"
          objectFit="cover"
          width="100%"
          alt="album art"
          src={artworkUrl || 'https://semantic-ui.com/images/wireframe/image.png'}
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
      <Stack w={{ base: '90%', md: '100%' }}>
        <Breadcrumb fontSize="sm" separator={<BiChevronRight color="gray.500" />}>
          <BreadcrumbItem>
            <Link passHref href={`/overview`}>
              <BreadcrumbLink>{workspaces?.[currentWorkspace]?.workspace.name}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link passHref href={'/releases'}>
              <BreadcrumbLink>Releases</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink fontWeight="bold" href={router.pathname}>
              {releaseData.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex pb={3} align="center" justify="space-between" w={{ base: '90%', md: '100%' }}>
          <HStack alignItems="center" width="100%" margin={['0 auto']}>
            <Heading>{releaseData.name}</Heading>
          </HStack>
          {canDeleteRelease && (
            <Button colorScheme="red" onClick={onOpen}>
              Delete
            </Button>
          )}
        </Flex>
      </Stack>

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
