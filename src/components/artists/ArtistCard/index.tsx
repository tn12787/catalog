import { Stack, Image, Skeleton, Text, HStack, Icon } from '@chakra-ui/react';
import { Artist } from '@prisma/client';
import React from 'react';
import { BiDisc } from 'react-icons/bi';
import { useRouter } from 'next/router';

import useAppColors from 'hooks/useAppColors';

interface Props {
  artist: Artist & { _count?: { releases: number } };
  loading?: boolean;
}

const ArtistCard = ({ artist, loading }: Props) => {
  const router = useRouter();
  const { border, bgSecondary } = useAppColors();
  return (
    <Stack
      borderRadius="lg"
      boxShadow="lg"
      overflow="hidden"
      transition="all 0.2s ease-in-out"
      _hover={{ transform: 'translateY(-1%)' }}
      onClick={() => router.push(`/artists/${artist.id}`)}
      cursor="pointer"
      border="1px solid"
      borderColor={border}
      bg={bgSecondary}
    >
      <Skeleton isLoaded={!loading}>
        <Image
          height="100px"
          w="100%"
          objectFit="cover"
          alt="artistPic"
          src={
            artist.imageUrl ??
            'https://www.theatromarrakech.com/wp-content/plugins/urvenue-plugin/images/placeholder.artist.jpg'
          }
        ></Image>
      </Skeleton>
      <HStack p={3} px={3} justifyContent="space-between">
        <Skeleton isLoaded={!loading}>
          <Text fontWeight="semibold" fontSize="xl">
            {artist.name}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!loading}>
          <HStack>
            <Icon as={BiDisc}></Icon>
            <Text>{artist._count?.releases}</Text>
          </HStack>
        </Skeleton>
      </HStack>
    </Stack>
  );
};

export default ArtistCard;
