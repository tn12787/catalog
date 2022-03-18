import { Box, BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

const MotionBox = motion(Box);

const HeroCircle = (props: BoxProps) => {
  return <MotionBox position={'absolute'} boxSize={'120px'} rounded="full" {...props} />;
};

export default HeroCircle;
