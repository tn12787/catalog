import { extendTheme, theme } from '@chakra-ui/react';

import { customColors } from 'colors';

export const appTheme = extendTheme({
  fonts: {
    body: 'InterVariable, Inter, sans-serif',
    heading: 'InterVariable, Inter, sans-serif',
    mono: 'Menlo, Consolas, monospace',
  },
  components: {
    Heading: {
      ...theme.components.Heading,
      sizes: { ...theme.components.Heading.sizes, xl: { fontWeight: 'black' } },
    },
  },

  colors: customColors,
});
