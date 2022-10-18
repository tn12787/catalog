import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { BiMenu } from 'react-icons/bi';

import { appLinks } from '../../../appLinks';

import Nav from 'components/pageItems/Nav';
import useAppColors from 'hooks/useAppColors';
import OnboardingButton from 'components/onboarding/OnboardingButton';

type Props = {
  children?: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bgPrimary } = useAppColors();
  return (
    <Flex minH="100vh">
      <Box display={{ base: 'none', md: 'flex' }}>
        <Nav links={appLinks} />
      </Box>
      <OnboardingButton />
      <Box display={{ base: 'block', md: 'none' }}>
        <IconButton
          aria-label="open menu"
          icon={<BiMenu />}
          rounded="full"
          position="fixed"
          bottom={'20px'}
          right={'20px'}
          zIndex={'popover'}
          boxShadow="xl"
          colorScheme="purple"
          onClick={onOpen}
        >
          Open
        </IconButton>
        <Drawer isOpen={isOpen} placement="left" size={'xs'} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg={bgPrimary}>
            <Nav
              links={appLinks}
              onItemSelected={(href) => {
                if (href === '/notifications') return;

                onClose();
              }}
            />
          </DrawerContent>
        </Drawer>
      </Box>
      <Flex width="100%" ml={{ base: 0, md: '300px' }} overflowY="auto">
        {children}
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
