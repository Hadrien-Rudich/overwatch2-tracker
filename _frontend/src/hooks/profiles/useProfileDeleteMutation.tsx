import { useMutation } from '@tanstack/react-query';
import { profileStore } from '../../store/profileStore';
import type { ProfileData } from '../../types/store/profileTypes';
import { deleteProfileFromApi } from '../../services/API/profiles';

function useProfileDeleteMutation({ profileObj }: { profileObj: ProfileData }) {
  const {
    unselectProfile,
    deleteProfile,
    setProfileSavedToast,
    setProfileSavedToastMessage,
  } = profileStore();

  const { mutate } = useMutation({
    mutationFn: () => deleteProfileFromApi(profileObj.userId, profileObj.id),
    onSuccess: () => {
      deleteProfile(profileObj.label);
      setProfileSavedToastMessage('Profile deleted...');
      setProfileSavedToast(true);
      unselectProfile();
    },
    retry: 1,
  });

  return mutate;
}

export default useProfileDeleteMutation;
