import { Flex, HStack, Stack } from '@chakra-ui/react';
import React from 'react';
import { ReleaseTaskType, TaskStatus } from '@prisma/client';

import HeroRightListItem from './HeroRightListItem';
import HeroCircle from './HeroCircle';

const HeroRight = () => {
  return (
    <HStack
      position="relative"
      spacing={'-81'}
      w="100%"
      justifyContent={{ base: 'center', lg: 'flex-end' }}
    >
      <Stack maxW={{ base: '220px', lg: '270px' }} w="100%" zIndex={'banner'}>
        <HeroRightListItem
          name={null}
          type={ReleaseTaskType.ARTWORK}
          status={TaskStatus.COMPLETE}
        />
        <HeroRightListItem
          name={null}
          type={ReleaseTaskType.MASTERING}
          status={TaskStatus.COMPLETE}
        />
        <HeroRightListItem
          name={null}
          type={ReleaseTaskType.DISTRIBUTION}
          status={TaskStatus.IN_PROGRESS}
        />
        <HeroRightListItem
          name={'🎥 Music Video'}
          type={ReleaseTaskType.GENERIC}
          status={TaskStatus.OUTSTANDING}
        />
      </Stack>
      <Flex
        display={{ base: 'none', sm: 'flex' }}
        h={{ base: '250px', md: '250px' }}
        w={{ base: '200px', md: '250px' }}
        position="relative"
        justifyContent={'flex-end'}
      >
        <HeroCircle left={'80px'} top="110px" bg="red.400"></HeroCircle>
        <HeroCircle left={'70px'} top="50px" bg="yellow.400"></HeroCircle>
        <HeroCircle left={'100px'} top="70px" bg="purple.400"></HeroCircle>
        <HeroCircle left={'130px'} top="30px" bg="green.400"></HeroCircle>
      </Flex>
    </HStack>
  );
};

export default HeroRight;
