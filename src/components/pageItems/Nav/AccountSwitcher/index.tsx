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
import useAllWorkspaceNotifications from 'hooks/data/notifications/useAllWorkspaceNotifications';
import UnreadCountBadge from 'components/notifications/UnreadCountBadge';

type Props = {
  onChange: () => void;
};

export const AccountSwitcher = ({ onChange }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { token, currentWorkspace, onChangeWorkspace, status } = useExtendedSession();
  const router = useRouter();
  const [userData] = useUser();
  const { bodySub, border } = useAppColors();

  const sessionLoading = status === 'loading';

  const onLogout = async () => {
    localStorage.removeItem('activeWorkspace');
    signOut({ callbackUrl: '/login' });
  };

  const { withoutCurrent, mapped } = useAllWorkspaceNotifications();

  const userWorkspaces = userData?.workspaces || token?.workspaceMemberships;
  const activeWorkspace = useMemo(() => {
    return userWorkspaces?.find((item) => item.workspaceId === currentWorkspace);
  }, [currentWorkspace, userWorkspaces]);

  return (
    <Menu>
      <Skeleton rounded="lg" isLoaded={!sessionLoading}>
        <AccountSwitcherButton
          workspaceName={(activeWorkspace?.workspace.name as string) ?? 'loadingWorkspace'}
          userName={(userData?.name || (token?.name as string)) ?? 'loadingUser'}
          photoUrl={activeWorkspace?.workspace.imageUrl as string}
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
            title="Workspaces"
            defaultValue={currentWorkspace as string}
            value={currentWorkspace as string}
            onChange={(val) => {
              onChangeWorkspace(val as string);
              onChange();
            }}
          >
            {userWorkspaces?.map(({ workspace }, index) => (
              <MenuItemOption
                key={index.toString()}
                value={workspace.id}
                fontWeight="semibold"
                type="radio"
              >
                <HStack>
                  <Avatar
                    size="sm"
                    borderRadius="md"
                    objectFit="cover"
                    src={workspace.imageUrl ?? ''}
                    referrerPolicy="no-referrer"
                    alt="Workspace Image"
                    name={workspace.name}
                  />
                  <Text>{workspace.name}</Text>
                  {currentWorkspace !== workspace.id && (
                    <UnreadCountBadge count={mapped[workspace.id]?.notifications.total} />
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
