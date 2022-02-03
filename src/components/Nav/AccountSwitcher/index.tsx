import {
  Avatar,
  Divider,
  HStack,
  Icon,
  Menu,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Skeleton,
  Stack,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { useMemo } from 'react';
import { BiCog, BiLogOut } from 'react-icons/bi';
import { useRouter } from 'next/router';

import { AccountSwitcherButton } from './AccountSwitcherButton';

import useExtendedSession from 'hooks/useExtendedSession';
import useUser from 'hooks/useUser';
import useAppColors from 'hooks/useAppColors';
import useAllTeamNotifications from 'hooks/data/notifications/useAllTeamNotifications';
import UnreadCountBadge from 'components/notifications/UnreadCountBadge';

type Props = {
  onChange: () => void;
};

export const AccountSwitcher = ({ onChange }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { token, currentTeam, onChangeTeam, status } = useExtendedSession();
  const router = useRouter();
  const [userData] = useUser();
  const { bodySub, border } = useAppColors();

  const sessionLoading = status === 'loading';

  const onLogout = async () => {
    localStorage.removeItem('activeTeam');
    signOut({ callbackUrl: '/login' });
  };

  const { withoutCurrent, mapped } = useAllTeamNotifications();

  const userTeams = userData?.teams || token?.teams;
  const activeTeam = useMemo(() => {
    return userTeams?.find((item) => item.teamId === currentTeam);
  }, [currentTeam, userTeams]);

  return (
    <Menu>
      <Skeleton rounded="lg" isLoaded={!sessionLoading}>
        <AccountSwitcherButton
          teamName={(activeTeam?.team.name as string) ?? 'loadingTeam'}
          userName={(userData?.name || (token?.name as string)) ?? 'loadingUser'}
          photoUrl={activeTeam?.team.imageUrl as string}
          unreadNotificationCount={
            withoutCurrent?.reduce((acc, item) => acc + item.notifications.total, 0) ?? 0
          }
        />
      </Skeleton>
      <MenuList
        shadow="xl"
        py={4}
        spacing={4}
        borderColor={border}
        color={useColorModeValue('gray.600', 'gray.200')}
      >
        <Stack>
          <HStack px={4} fontSize="xs" color={bodySub}>
            <Avatar
              size="2xs"
              src={userData?.image as string}
              name={userData?.name || (token?.name as string)}
            />
            <Text fontSize="xs">{token?.email}</Text>
          </HStack>
          <MenuOptionGroup
            type="radio"
            title="Teams"
            defaultValue={currentTeam as string}
            value={currentTeam as string}
            onChange={(val) => {
              onChangeTeam(val as string);
              onChange();
            }}
          >
            {userTeams?.map(({ team }, index) => (
              <MenuItemOption
                key={index.toString()}
                value={team.id}
                fontWeight="semibold"
                type="radio"
              >
                <HStack>
                  <Avatar
                    size="sm"
                    borderRadius="md"
                    objectFit="cover"
                    src={team.imageUrl ?? ''}
                    referrerPolicy="no-referrer"
                    alt="Team Image"
                    name={team.name}
                  />
                  <Text>{team.name}</Text>
                  {currentTeam !== team.id && (
                    <UnreadCountBadge count={mapped[team.id].notifications.total} />
                  )}
                </HStack>
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem
              icon={<Icon as={BiCog} fontSize="lg" />}
              onClick={() => {
                router.push('/user/settings');
                onChange();
              }}
            >
              User settings
            </MenuItem>
            <MenuItem
              icon={<Icon as={BiLogOut} fontSize="lg" />}
              onClick={() => {
                onChange();
                onLogout();
              }}
            >
              Log out
            </MenuItem>
          </MenuGroup>
          <Divider />
          <HStack pt={2} px={4} justify={'space-between'}>
            <Text fontSize={'sm'} fontWeight={'semibold'}>
              Light mode
            </Text>
            <Switch
              colorScheme="purple"
              isChecked={colorMode === 'light'}
              onChange={toggleColorMode}
            />
          </HStack>
        </Stack>
      </MenuList>
    </Menu>
  );
};
