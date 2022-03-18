import { Stack } from '@chakra-ui/react';

import MarketingNavBar from 'components/marketing/navigation/MarketingNavBar';
import useAppColors from 'hooks/useAppColors';

const MarketingLayout: React.FC = ({ children }) => {
  const { bgPrimary } = useAppColors();
  return (
    <Stack minH="100vh" bg={bgPrimary}>
      <MarketingNavBar></MarketingNavBar>
      {children}
    </Stack>
  );
};

export default MarketingLayout;
