import { useMemo } from 'react';

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
  const { data: artists, isLoading: areArtistsLoading } = useArtists();
  const { workspace, isLoading: isCurrentWorkspaceLoading } = useCurrentWorkspace();
  const { data: releases, isLoading: areReleasesLoading } = useReleases({});
  const { data: contacts, isLoading: areContactsLoading } = useContacts({});

  const isAnythingLoading = [
    areArtistsLoading,
    isCurrentWorkspaceLoading,
    areReleasesLoading,
    areContactsLoading,
  ].some(Boolean);

  const onboardingItems = useMemo(() => {
    return [
      {
        name: 'Add or update workspace info',
        isComplete: !!workspace?.updatedAt,
      },
      { name: 'Create your first artist', isComplete: !!artists?.length },
      { name: 'Create your first release', isComplete: !!releases?.total },
      { name: 'Add or import some contacts', isComplete: !!contacts?.total },
    ];
  }, [artists, workspace, releases, contacts]);

  const anyOnboardingLeft = useMemo(() => {
    return onboardingItems.some((item) => !item.isComplete);
  }, [onboardingItems]);

  return {
    items: onboardingItems,
    isLoading: isAnythingLoading,
    incomplete: anyOnboardingLeft,
  };
};

export default useOnboardingItems;
