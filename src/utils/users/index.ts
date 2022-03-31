import { User } from 'next-auth';

import { isBackendFeatureEnabled } from 'common/features';
import { addMailingListEntry, sendDynamicEmail } from 'backend/apiUtils/email';
import { createDefaultWorkspaceForUser } from 'backend/apiUtils/workspaces';
import prisma from 'backend/prisma/client';
import { FeatureKey } from 'common/features/types';

const userSignupTemaplateId = 'd-ff377af78f3c496285d16dcc4071ed3c';
const welcomeEmailTemplateId = 'd-443b4118fe9447238d67b529d0dc3b86';

export const onUserCreated = async ({ user }: { user: User }) => {
  await createDefaultWorkspaceForUser({
    name: user.name as string,
    userId: user.id as string,
    email: user.email as string,
  });

  const [firstName, lastName] = (user.name ?? '').split(' ');
  await addMailingListEntry({ firstName, lastName, email: user.email as string });

  await prisma.user.update({
    where: { id: user.id as string },
    data: {
      emailPreferences: {
        connectOrCreate: {
          where: { userId: user.id as string },
          create: {},
        },
      },
    },
  });

  if (isBackendFeatureEnabled(FeatureKey.SIGNUP_NOTIFICATIONS)) {
    await sendDynamicEmail<{ name: string; email: string }>({
      to: ['tom@catalogapp.io', 'seb@catalogapp.io'],
      dynamicTemplateData: { name: user.name as string, email: user.email as string },
      templateId: userSignupTemaplateId,
    });
  }

  await sendDynamicEmail<any>({
    to: user.email as string,
    dynamicTemplateData: {},
    templateId: welcomeEmailTemplateId,
  });
};
