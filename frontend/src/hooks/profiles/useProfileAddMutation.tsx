import { useMutation } from '@tanstack/react-query';
import { profileStore } from '../../store/profileStore';
import {
  addProfileToApi,
  ProfileAddedtoApi,
} from '../../services/API/profiles';
import { authStore } from '../../store/authStore';

function useProfileAddMutation() {
  const {
    newProfile,
    clearNewProfile,
    addNewProfile,
    setProfileSavedToastMessage,
    setProfileSavedToast,
    setIsCreatingProfile,
  } = profileStore();

  const { userData } = authStore();

  const { mutate } = useMutation({
    mutationFn: () => addProfileToApi(userData.id, newProfile),
    onSuccess: (newProfileAddedToApi: ProfileAddedtoApi) => {
      setProfileSavedToastMessage('Profile created...');
      setProfileSavedToast(true);
      addNewProfile(newProfileAddedToApi.profile);
      clearNewProfile();
      setIsCreatingProfile(false);
    },
    retry: 1,
  });

  return mutate;
}

export default useProfileAddMutation;
