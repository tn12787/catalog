import {
  Skeleton,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { BiCalendar } from 'react-icons/bi';
import { FiChevronDown } from 'react-icons/fi';

import DeleteReleaseDialog from '../DeleteReleaseDialog';

import { ClientRelease } from 'types/common';
import { buildPlannerLink } from 'utils/planner';
import useExtendedSession from 'hooks/useExtendedSession';
import { hasRequiredPermissions } from 'utils/auth';

type Props = { releaseData: ClientRelease; isLoading?: boolean };

const SingleReleaseMenu = ({ releaseData, isLoading }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { currentWorkspace, workspaceMemberships } = useExtendedSession();
  const canDeleteRelease = hasRequiredPermissions(
    ['DELETE_RELEASES'],
    workspaceMemberships?.[currentWorkspace]
  );
  return (
    <Skeleton isLoaded={!isLoading}>
      <Menu size="sm">
        <MenuButton
          as={Button}
          variant="outline"
          colorScheme="purple"
          rightIcon={<FiChevronDown />}
          size="sm"
        >
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem
            icon={<BiCalendar />}
            onClick={() =>
              router.push(
                buildPlannerLink(releaseData.id, new Date(releaseData.targetDate)),
                buildPlannerLink(releaseData.id, new Date(releaseData.targetDate)),
                { shallow: true }
              )
            }
          >
            View in planner
          </MenuItem>
          <MenuDivider />
          {canDeleteRelease && (
            <MenuItem color="red" onClick={onOpen}>
              Delete
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <DeleteReleaseDialog
        onConfirm={onClose}
        isOpen={isOpen}
        onCancel={onClose}
        onClose={onClose}
        releaseData={releaseData}
      />
    </Skeleton>
  );
};

export default SingleReleaseMenu;
