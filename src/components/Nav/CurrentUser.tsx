import {
  Box,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useUser } from 'reactfire';
import { BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { useState } from 'react';
import { useAuth } from 'reactfire';

interface Props {}
const CurrentUser = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const user = useUser();

  const onLogout = async () => {
    try {
      setLoading(true);
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        return auth.signOut();
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await auth.currentUser?.delete();
    } finally {
      setLoading(false);
    }
  };

  return (
    <HStack py={3} justify="space-between">
      <HStack align="center">
        <Image
          borderRadius="400px"
          w={'48px'}
          h={'48px'}
          src={user?.data?.photoURL as string}
        />
        <Text>{user?.data?.displayName}</Text>
      </HStack>
      <Menu>
        <Box>
          <MenuButton
            color="white"
            as={IconButton as any}
            icon={<BsThreeDotsVertical />}
            variant="ghost"
          />
        </Box>
        <MenuList color="charcoal">
          <MenuItem icon={<BiLogOut />} onClick={onLogout}>
            Log out
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<BsTrash />} color="red.400" onClick={onDelete}>
            Delete Account
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default CurrentUser;
