import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Skeleton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/client';
import { fetchMe } from 'queries/me';
import * as React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { AccountSwitcherButton } from './AccountSwitcherButton';

export const AccountSwitcher = () => {
  const [session, loading] = useSession();

  const onLogout = async () => {
    signOut();
  };

  const { data: response, isLoading } = useQuery('me', fetchMe);

  return (
    <Menu>
      <Skeleton rounded="lg" isLoaded={!loading && !isLoading}>
        <AccountSwitcherButton
          teamName={(response?.teams[0].team.name as string) ?? 'loadingTeam'}
          userName={(session?.user?.name as string) ?? 'loadingUser'}
          photoUrl={session?.user?.image as string}
        />
      </Skeleton>
      <MenuList
        shadow="lg"
        py="4"
        color={useColorModeValue('gray.600', 'gray.200')}
        px="3"
      >
        <Text fontWeight="medium" mb="2">
          {session?.user?.email}
        </Text>
        <MenuOptionGroup defaultValue={response?.teams[0].team.id}>
          {response?.teams.map(({ team }) => (
            <MenuItemOption
              key={team.id}
              value={team.id}
              fontWeight="semibold"
              rounded="md"
            >
              {team.name}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
        <MenuDivider />

        <MenuItem icon={<BiLogOut />} onClick={onLogout}>
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
