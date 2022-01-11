import React from 'react';
import NextLink from 'next/link';
import { Skeleton } from '@chakra-ui/skeleton';
import { Button } from '@chakra-ui/button';
import { Flex, Stack, HStack, Link, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { FiChevronDown } from 'react-icons/fi';
import { useDisclosure } from '@chakra-ui/hooks';

import DeleteReleaseDialog from '../DeleteReleaseDialog';

import ReleaseArtist from './ReleaseArtist';
import ReleaseDate from './ReleaseDate';
import ReleaseType from './ReleaseType';

import { ClientRelease } from 'types';
import ReleaseStatusBadge from 'components/releases/ReleaseStatusBadge';
import useAppColors from 'hooks/useAppColors';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';

interface ReleaseCardProps {
  releaseData: ClientRelease;
  loading?: boolean;
}

const ReleaseCard = ({ releaseData, loading }: ReleaseCardProps) => {
  const { border, bgSecondary } = useAppColors();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentTeam, teams } = useExtendedSession();
  const canDeleteRelease = hasRequiredPermissions(['DELETE_RELEASES'], teams?.[currentTeam]);

  const artworkTask = releaseData.artwork;

  return (
    <Flex
      overflow="hidden"
      alignItems="center"
      direction={{ base: 'column', md: 'row' }}
      borderRadius={'lg'}
      border="1px solid"
      borderColor={border}
      width="100%"
      bg={bgSecondary}
      pb={{ base: '10px', md: 0 }}
    >
      <Skeleton isLoaded={!loading} w={{ base: '100%', md: 'auto' }}>
        <Image
          src={artworkTask?.url || 'https://semantic-ui.com/images/wireframe/image.png'}
          alt="this is an image"
          width={{ base: '100%', md: '170px' }}
          minW={{ base: '100%', md: '170px' }}
          height="170px"
          backgroundSize="cover"
          objectFit="cover"
          borderRight="1px solid"
          borderColor={border}
        />
      </Skeleton>
      <Stack spacing={2} width="100%" direction="column" px={5}>
        <Stack align="center" direction={{ base: 'column', md: 'row' }} justify="space-between">
          <HStack alignItems="center" direction={{ base: 'column', md: 'row' }}>
            <Skeleton isLoaded={!loading}>
              <NextLink passHref href={`/releases/${releaseData.id}`}>
                <Text fontSize="25px" as={Link} isTruncated fontWeight="semibold">
                  {releaseData.name}
                </Text>
              </NextLink>
            </Skeleton>
            <Skeleton display="flex" alignItems="center" isLoaded={!loading}>
              <ReleaseStatusBadge releaseData={releaseData} />
            </Skeleton>
          </HStack>
          {canDeleteRelease && (
            <Skeleton isLoaded={!loading}>
              <Menu size="sm">
                <MenuButton
                  as={Button}
                  href={`/releases/${releaseData.id}`}
                  variant="outline"
                  colorScheme="purple"
                  rightIcon={<FiChevronDown />}
                  size="sm"
                >
                  Actions
                </MenuButton>
                <MenuList>
                  {/* <MenuItem
                  onClick={() => router.push(`/releases/${releaseData.id}`)}
                >
                  View Details
                </MenuItem> */}
                  {/* <MenuDivider /> */}
                  <MenuItem color="red" onClick={onOpen}>
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Skeleton>
          )}
        </Stack>
        <Stack>
          <Skeleton isLoaded={!loading} alignSelf="flex-start">
            <ReleaseArtist releaseData={releaseData} />
          </Skeleton>
          <Skeleton isLoaded={!loading} alignSelf="flex-start">
            <ReleaseType releaseData={releaseData} />
          </Skeleton>
          <Skeleton isLoaded={!loading} alignSelf="flex-start">
            <ReleaseDate releaseData={releaseData} />
          </Skeleton>
        </Stack>
      </Stack>
      <DeleteReleaseDialog
        onConfirm={onClose}
        isOpen={isOpen}
        onCancel={onClose}
        onClose={onClose}
        releaseData={releaseData}
      />
    </Flex>
  );
};

export default ReleaseCard;
