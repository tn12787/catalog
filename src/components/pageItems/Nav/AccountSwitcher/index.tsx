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
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';

type Props = {
  onChange: () => void;
};

export const AccountSwitcher = ({ onChange }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { workspaceList, currentWorkspace, onChangeWorkspace, isLoading } = useExtendedSession();
  const { workspace, isLoading: isWorkspaceLoading } = useCurrentWorkspace();
  const router = useRouter();
  const { data: userData, isLoading: isUserLoading } = useUser();
  const { bodySub, border } = useAppColors();

  const sessionLoading = isLoading;

  const onLogout = async () => {
    localStorage.removeItem('activeWorkspace');
    signOut({ callbackUrl: '/login' });
  };

  const { withoutCurrent, mapped } = useAllWorkspaceNotifications();

  const userWorkspaces = workspaceList;
  const activeWorkspace = useMemo(() => {
    return userWorkspaces?.find((item) => item.workspaceId === currentWorkspace);
  }, [currentWorkspace, userWorkspaces]);

  const isAnythingLoading = sessionLoading || isWorkspaceLoading || isUserLoading;

  return (
    <Menu>
      <Skeleton rounded="lg" isLoaded={!isAnythingLoading}>
        <AccountSwitcherButton
          workspace={workspace}
          userName={userData?.name ?? 'loadingUser'}
          photoUrl={activeWorkspace?.workspace.imageUrl as string}
          unreadNotificationCount={
            withoutCurrent?.reduce((acc, item) => acc + item.notifications.total, 0) ?? 0
          }
        />
      </Skeleton>
      <MenuList
        shadow="xl"
        py={4}
        borderColor={border}
        color={useColorModeValue('gray.600', 'gray.200')}
      >
        <Stack spacing={4}>
          <HStack px={4} fontSize="xs" color={bodySub}>
            <Avatar size="2xs" src={userData?.image as string} name={userData?.name as string} />
            <Text fontSize="xs">{userData?.email as string}</Text>
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
