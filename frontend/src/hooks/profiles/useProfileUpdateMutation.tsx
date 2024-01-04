import { useMutation } from '@tanstack/react-query';
import { profileStore } from '../../store/profileStore';
import type { ProfileData } from '../../types/store/profileTypes';
import {
  updateProfileOnApi,
  ProfileAddedtoApi,
} from '../../services/API/profiles';

function useProfileUpdateMutation({ profileObj }: { profileObj: ProfileData }) {
  const {
    updatedProfileLabel,
    setIsUpdatingProfile,
    updateProfileLabel,
    selectProfile,
    setProfileSavedToastMessage,
    setProfileSavedToast,
  } = profileStore();

  const { mutate } = useMutation({
    mutationFn: () =>
      updateProfileOnApi(profileObj.userId, profileObj.id, updatedProfileLabel),
    onSuccess: (updatedProfile: ProfileAddedtoApi) => {
      setProfileSavedToast(true);
      setProfileSavedToastMessage('Profile updated...');
      updateProfileLabel(profileObj.id, updatedProfileLabel);
      setIsUpdatingProfile(false);
      selectProfile(updatedProfile.profile);
    },
    retry: 1,
  });

  return mutate;
}

export default useProfileUpdateMutation;
