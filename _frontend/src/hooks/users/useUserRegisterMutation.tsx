import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/API/users';

function useUserRegisterMutation({
  email,
  password,
  // battleTag,
  setCreateUser,
  setIsLoading,
  setEmailAlreadyInUse,
  setEmailAlreadyInUseError,
}: {
  email: string;
  password: string;
  // battleTag: string;
  setCreateUser: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setEmailAlreadyInUse: (value: boolean) => void;
  setEmailAlreadyInUseError: (value: string) => void;
}) {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: () =>
      register(
        email,
        password
        // battleTag
      ),
    onSuccess: (data) => {
      if (data.success) {
        navigate('/login');
      } else if (
        data.success === false &&
        data.message === 'Email is already in use'
      ) {
        setEmailAlreadyInUse(true);
        setEmailAlreadyInUseError('Email already in use');
      }
      setCreateUser(false);
      setIsLoading(false);
    },
    onError: () => {
      setCreateUser(false);
      setIsLoading(false);
    },
    retry: 1,
  });

  return mutate;
}

export default useUserRegisterMutation;
