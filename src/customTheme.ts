import { extendTheme, theme } from '@chakra-ui/react';

import { customColors } from './colors';

const fontStack =
  'InterVariable, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const appTheme = extendTheme({
  fonts: {
    body: fontStack,
    heading: fontStack,
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
