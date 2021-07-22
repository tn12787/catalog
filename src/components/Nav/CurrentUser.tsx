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
  Skeleton,
  SkeletonCircle,
  Text,
} from '@chakra-ui/react';
import { BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { signOut, useSession } from 'next-auth/client';

interface Props {}
const CurrentUser = (props: Props) => {
  const [session, loading] = useSession();

  const onLogout = async () => {
    signOut();
  };

  const onDelete = async () => {};

  return (
    <HStack py={3} justify="space-between">
      <HStack align="center">
        <SkeletonCircle
          isLoaded={!loading}
          startColor="purple.600"
          endColor="purple.800"
          w={'48px'}
          h={'48px'}
        >
          <Image
            borderRadius="400px"
            w={'48px'}
            h={'48px'}
            alt="profile picture"
            src={session?.user?.image as string}
          />
        </SkeletonCircle>
        <Skeleton
          isLoaded={!loading}
          startColor="purple.600"
          endColor="purple.800"
        >
          <Text isTruncated>
            {loading ? 'sample name real' : session?.user?.name}
          </Text>
        </Skeleton>
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
