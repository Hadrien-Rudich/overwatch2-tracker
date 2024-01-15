import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
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
  } = profileStore();

  const { mutate } = useMutation({
    mutationFn: () =>
      updateProfileOnApi(profileObj.userId, profileObj.id, updatedProfileLabel),
    onSuccess: (updatedProfile: ProfileAddedtoApi) => {
      updateProfileLabel(profileObj.id, updatedProfileLabel);
      setIsUpdatingProfile(false);
      selectProfile(updatedProfile.profile);
      toast.success('profile updated...', {
        position: 'bottom-right',
        theme: 'dark',
      });
    },
    retry: 1,
  });

  return mutate;
}

export default useProfileUpdateMutation;
