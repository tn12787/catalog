import { ComponentSingleStyleConfig } from '@chakra-ui/react';

export const InnerRadioButton: ComponentSingleStyleConfig = {
  baseStyle: {
    textAlign: 'center',
    transition: 'all 0.2s',
    cursor: 'pointer',
    fontWeight: 'medium',
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 3,
      py: 1,
    },
    md: {
      fontSize: 'sm',
      px: 4,
      py: 2,
    },
    lg: {
      fontSize: 'md',
      px: 5,
      py: 3,
    },
  },
  defaultProps: {
    size: 'md' as any,
  },
};
