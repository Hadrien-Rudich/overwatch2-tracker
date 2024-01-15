import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { profileStore } from '../../store/profileStore';
import {
  addProfileToApi,
  ProfileAddedtoApi,
} from '../../services/API/profiles';
import { authStore } from '../../store/authStore';

function useProfileAddMutation() {
  const { newProfile, clearNewProfile, addNewProfile, setIsCreatingProfile } =
    profileStore();

  const { userData } = authStore();

  const { mutate } = useMutation({
    mutationFn: () => addProfileToApi(userData.id, newProfile),
    onSuccess: (newProfileAddedToApi: ProfileAddedtoApi) => {
      addNewProfile(newProfileAddedToApi.profile);
      clearNewProfile();
      setIsCreatingProfile(false);
      toast.success('profile created...', {
        position: 'bottom-right',
        theme: 'dark',
      });
    },
    retry: 1,
  });

  return mutate;
}

export default useProfileAddMutation;
