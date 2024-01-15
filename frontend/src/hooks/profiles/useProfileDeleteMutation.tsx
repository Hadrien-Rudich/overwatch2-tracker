import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { profileStore } from '../../store/profileStore';
import type { ProfileData } from '../../types/store/profileTypes';
import { deleteProfileFromApi } from '../../services/API/profiles';

function useProfileDeleteMutation({ profileObj }: { profileObj: ProfileData }) {
  const { unselectProfile, deleteProfile } = profileStore();

  const { mutate } = useMutation({
    mutationFn: () => deleteProfileFromApi(profileObj.userId, profileObj.id),
    onSuccess: () => {
      deleteProfile(profileObj.label);
      toast.success('profile deleted...', {
        position: 'bottom-right',
        theme: 'dark',
      });
      unselectProfile();
    },
    retry: 1,
  });

  return mutate;
}

export default useProfileDeleteMutation;
