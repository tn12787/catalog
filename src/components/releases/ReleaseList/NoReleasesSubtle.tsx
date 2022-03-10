import { Stack, Text, StackProps } from '@chakra-ui/react';
import React from 'react';

import useAppColors from 'hooks/useAppColors';

interface Props extends StackProps {
  title: string;
  description: string;
  icon: React.ReactElement;
}

const NoReleasesSubtle = ({ title, description, icon, children, ...rest }: Props) => {
  const { bodySub } = useAppColors();
  return (
    <Stack color={bodySub} spacing={4} py={'40px'} align="center" {...rest}>
      {icon}
      <Text fontSize="lg">{title}</Text>
      <Text fontSize="sm">{description}</Text>
      {children}
    </Stack>
  );
};

export default NoReleasesSubtle;
