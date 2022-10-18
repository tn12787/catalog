import { Avatar, Button, HStack, Text, Link } from '@chakra-ui/react';
import { Invite, Workspace } from '@prisma/client';
import React from 'react';
import NextLink from 'next/link';

import useAppColors from 'hooks/useAppColors';

type Props = {
  invite: Invite & { workspace: Workspace };
};

const WorkspaceInvite = ({ invite }: Props) => {
  const { border } = useAppColors();
  return (
    <HStack
      p={3}
      borderWidth="1px"
      borderColor={border}
      borderRadius="md"
      justify={'space-between'}
    >
      <HStack>
        <Avatar
          size="md"
          borderRadius="md"
          objectFit="cover"
          src={invite.workspace.imageUrl as string}
          referrerPolicy="no-referrer"
          name={invite.workspace.name}
        />
        <Text fontWeight="semibold" fontSize="lg">
          {invite.workspace.name}
        </Text>
      </HStack>
      <NextLink passHref href={`invite/${invite.id}`}>
        <Button colorScheme={'purple'} size="xs" as={Link}>
          Accept Invitation
        </Button>
      </NextLink>
    </HStack>
  );
};

export default WorkspaceInvite;
