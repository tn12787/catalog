import { Badge, BadgeProps } from '@chakra-ui/react';
import React from 'react';

type Props = BadgeProps & {
  count: number;
};

const UnreadCountBadge = ({ count, ...rest }: Props) => {
  const adjustedCount = count > 99 ? '99+' : count;
  return count ? (
    <Badge
      alignItems={'center'}
      justifyContent={'center'}
      display="flex"
      flex="0 0 auto"
      rounded="full"
      minW={5}
      px={1}
      py={0.5}
      fontSize="11px"
      colorScheme={'red'}
      variant="solid"
      {...rest}
    >
      {adjustedCount}
    </Badge>
  ) : null;
};

export default UnreadCountBadge;
