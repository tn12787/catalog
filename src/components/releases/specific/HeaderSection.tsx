import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
import SingleReleaseMenu from '../SingleReleaseMenu';
import ReleasePlaceholder from '../ReleasePlaceholder';

import { ClientRelease } from 'types/common';
import useAppColors from 'hooks/useAppColors';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

interface Props {
  releaseData: ClientRelease;
}

const HeaderSection = ({ releaseData }: Props) => {
  const router = useRouter();

  const { isOpen, onClose } = useDisclosure();
  const { bgPrimary } = useAppColors();
  const { workspace } = useCurrentWorkspace();

  const artworkUrl = releaseData.artwork?.url;

  return (
    <Stack width={['100%', '100%', '90%']} maxWidth={'container.lg'} alignItems="center">
      <Flex position="relative" overflow="hidden" w="100%">
        <Box filter="blur(5px)" transform={'scale(1.05)'} maxH="200px" width="100%">
          <Image
            as={Image}
            w="100%"
            layout="responsive"
            objectFit="cover"
            alt="album art"
            src={artworkUrl as string}
            fallback={<ReleasePlaceholder h="200px"></ReleasePlaceholder>}
          />
        </Box>
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
              <BreadcrumbLink>{workspace?.name}</BreadcrumbLink>
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
        <Flex pb={3} align="center" justify="space-between" w={{ base: '100%', md: '100%' }}>
          <HStack alignItems="center" width="100%" margin={['0 auto']}>
            <Heading>{releaseData.name}</Heading>
          </HStack>
          <SingleReleaseMenu releaseData={releaseData} />
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
