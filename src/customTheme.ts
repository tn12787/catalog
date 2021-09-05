import { extendTheme } from '@chakra-ui/react';
// 2. Call `extendTheme` and pass your custom values
export const appTheme = extendTheme({
  fonts: {
    body: 'InterVariable, Inter, sans-serif',
    heading: 'InterVariable, Inter, sans-serif',
    mono: 'Menlo, Consolas, monospace',
  },
  colors: {
    charcoal: '#444',
    softCharcoal: '#555',
    mist: '#888',
  },
});
