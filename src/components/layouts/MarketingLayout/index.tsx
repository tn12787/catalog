import { Stack } from '@chakra-ui/react';

import MarketingNavBar from 'components/marketing/navigation/MarketingNavBar';
import useAppColors from 'hooks/useAppColors';

const MarketingLayout: React.FC = ({ children }) => {
  const { bgSecondary } = useAppColors();
  return (
    <Stack minH="100vh" spacing={0} bg={bgSecondary}>
      <MarketingNavBar></MarketingNavBar>
      {children}
    </Stack>
  );
};

export default MarketingLayout;
