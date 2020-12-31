import { extendTheme } from '@chakra-ui/react';
// 2. Call `extendTheme` and pass your custom values
export const appTheme = extendTheme({
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, serif',
    mono: 'Menlo, monospace',
  },
  colors: {
    charcoal: '#444',
    softCharcoal: '#555',
    mist: '#888',
  },
});
