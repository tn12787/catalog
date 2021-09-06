import { useColorModeValue } from '@chakra-ui/color-mode';

const useAppColors = () => {
  return {
    bgPrimary: useColorModeValue('#fafafa', 'gray.900'),
    bgSecondary: useColorModeValue('white', 'gray.800'),
    border: useColorModeValue('gray.200', 'gray.700'),
    primary: useColorModeValue('#504DFF', '#7673FF'),
  };
};

export default useAppColors;