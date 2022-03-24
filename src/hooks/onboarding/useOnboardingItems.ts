import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { hasPaidPlan } from 'utils/billing';
import useCurrentWorkspace from 'hooks/data/workspaces/useCurrentWorkspace';
import { OnboardingItem } from 'components/onboarding/OnboardingPopover/types';
import useArtists from 'hooks/data/artists/useArtists';
import useReleases from 'hooks/data/releases/useReleases';
import useContacts from 'hooks/data/contacts/useContacts';

type UseOnboardingItemsReturn = {
  isLoading: boolean;
  items: OnboardingItem[];
  incomplete: boolean;
};

const useOnboardingItems = (): UseOnboardingItemsReturn => {
  const { data: artists, isLoading: areArtistsLoading } = useArtists({});
  const { workspace, isLoading: isCurrentWorkspaceLoading } = useCurrentWorkspace();
  const { data: releases, isLoading: areReleasesLoading } = useReleases({});
  const { data: contacts, isLoading: areContactsLoading } = useContacts({});
  const router = useRouter();

  const isAnythingLoading = [
    areArtistsLoading,
    isCurrentWorkspaceLoading,
    areReleasesLoading,
    areContactsLoading,
    !artists,
    !workspace,
    !releases,
    !contacts,
  ].some(Boolean);

  const onboardingItems = useMemo(() => {
    return [
      {
        name: 'Add or update workspace info',
        isComplete: !!workspace?.updatedAt,
        onGo: () => router.push(`/workspaces/${workspace?.id}/settings`),
      },
      {
        name: 'Create your first artist',
        isComplete: !!artists?.length,
        onGo: () => router.push(`/artists/new`),
      },
      {
        name: 'Create your first release',
        isComplete: !!releases?.total,
        onGo: () => router.push(`/releases/new`),
      },
      hasPaidPlan(workspace) && {
        name: 'Add or import some contacts',
        isComplete: !!contacts?.total,
        onGo: () => router.push(`/contacts`),
      },
    ].filter(Boolean) as OnboardingItem[];
  }, [artists, workspace, router, releases, contacts]);

  const anyOnboardingLeft = useMemo(() => {
    return isAnythingLoading ? false : onboardingItems.some((item) => !item.isComplete);
  }, [onboardingItems, isAnythingLoading]);

  return {
    items: onboardingItems,
    isLoading: isAnythingLoading,
    incomplete: anyOnboardingLeft,
  };
};

export default useOnboardingItems;
