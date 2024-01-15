import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { authStore } from '../../store/authStore';
import { updateUserEmail } from '../../services/API/users';

function useAccountUpdateMutation() {
  const {
    userData,
    newEmail,
    clearNewEmail,
    updateUserData,
    toggleEditAccount,
  } = authStore();

  const { mutate } = useMutation({
    mutationFn: () => updateUserEmail(userData.id, newEmail),
    onSuccess: () => {
      updateUserData(newEmail);
      clearNewEmail();
      toggleEditAccount();
      toast.success('email updated...', {
        position: 'bottom-right',
        theme: 'dark',
      });
    },
    retry: 1,
  });

  return mutate;
}

export default useAccountUpdateMutation;
