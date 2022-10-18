import { Stack } from '@chakra-ui/react';

import Footer from './Footer';

import MarketingNavBar from 'components/marketing/navigation/MarketingNavBar';
import useAppColors from 'hooks/useAppColors';

type Props = {
  children?: React.ReactNode;
};

const MarketingLayout: React.FC<Props> = ({ children }) => {
  const { bgSecondary } = useAppColors();
  return (
    <Stack minH="100vh" w="100%" spacing={0} bg={bgSecondary}>
      <MarketingNavBar></MarketingNavBar>
      {children}
      <Footer></Footer>
    </Stack>
  );
};

export default MarketingLayout;
