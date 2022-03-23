import { Box, BoxProps } from '@chakra-ui/react';
import { motion, MotionProps } from 'framer-motion';
import React from 'react';

const MotionBox = motion<BoxProps>(Box);

const HeroCircle = (props: BoxProps & MotionProps) => {
  return <MotionBox position={'absolute'} boxSize={'120px'} rounded="full" {...props} />;
};

export default HeroCircle;
