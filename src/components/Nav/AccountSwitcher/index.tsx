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
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { useQuery } from 'react-query';

import { AccountSwitcherButton } from './AccountSwitcherButton';

import { fetchMe } from 'queries/me';

export const AccountSwitcher = () => {
  const [session, loading] = useSession();
  const onLogout = async () => {
    signOut();
  };

  const { data: response, isLoading } = useQuery('me', fetchMe);

  const [selectedTeam, setSelectedTeam] = useState(response?.teams[0].teamId);

  const activeTeam = useMemo(() => {
    return response?.teams.find((item) => item.teamId === selectedTeam);
  }, [selectedTeam, response?.teams]);

  useEffect(() => {
    if (response?.teams) {
      setSelectedTeam(response?.teams[0].teamId);
    }
  }, [response?.teams]);

  return (
    <Menu>
      <Skeleton rounded="lg" isLoaded={!loading && !isLoading}>
        <AccountSwitcherButton
          teamName={(activeTeam?.team.name as string) ?? 'loadingTeam'}
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
        <MenuOptionGroup
          type="radio"
          defaultValue={selectedTeam as string}
          value={selectedTeam as string}
          onChange={(val) => setSelectedTeam(val as string)}
        >
          {response?.teams.map(({ team }, index) => (
            <MenuItemOption
              key={index.toString()}
              value={team.id}
              fontWeight="semibold"
              rounded="md"
              type="radio"
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
