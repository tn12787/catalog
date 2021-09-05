import { Flex } from '@chakra-ui/react';
import { appLinks } from 'appLinks';
import Nav from 'components/Nav';
import React from 'react';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <Flex minH="100vh">
      <Nav links={appLinks} />
      <Flex width="100%" ml={{ base: 0, md: '300px' }} overflowY="auto">
        {children}
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
