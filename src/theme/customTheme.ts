import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

import { InnerRadioButton } from './CustomRadioButton';
import { customColors } from './colors';

const fontStack =
  'InterVariable, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const theme = extendTheme({
  fonts: {
    body: fontStack,
    heading: fontStack,
    mono: 'Menlo, Consolas, monospace',
  },
  components: {
    InnerRadioButton,
  },

  colors: customColors,
});
