import { Badge, BadgeProps } from '@chakra-ui/react';
import React from 'react';

type Props = BadgeProps;

const SaleBadge = ({ ...rest }: Props) => {
  return (
    <Badge colorScheme={'green'} variant="solid" size="xs" {...rest}>
      SALE
    </Badge>
  );
};

export default SaleBadge;
