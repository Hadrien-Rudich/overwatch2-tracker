import { useMutation } from '@tanstack/react-query';
import { authStore } from '../../store/authStore';
import { logIn, UserVerified } from '../../services/API/users';

function useUserLoginMutation({
  email,
  password,
  setUserAuthenticated,
  setInvalidPassword,
  setInvalidPasswordError,
  setUserNotFound,
  setUserNotFoundError,
  setIsLoading,
}: {
  email: string;
  password: string;
  setUserAuthenticated: (value: boolean) => void;
  setInvalidPassword: (value: boolean) => void;
  setInvalidPasswordError: (value: string) => void;
  setUserNotFound: (value: boolean) => void;
  setUserNotFoundError: (value: string) => void;
  setIsLoading: (value: boolean) => void;
}) {
  const { setLoggedIn, setUserData } = authStore();

  const { mutate } = useMutation({
    mutationFn: () => logIn(email, password),
    onSuccess: (fetchedData: UserVerified) => {
      setIsLoading(false);
      setUserData(fetchedData.user);
      setLoggedIn();
      setUserAuthenticated(false);
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        setInvalidPassword(true);
        setInvalidPasswordError('Invalid password');
      } else if (error.response?.status === 404) {
        setUserNotFound(true);
        setUserNotFoundError('User not found');
      } else if (error.response?.status === 400) {
        setInvalidPassword(true);
        setInvalidPasswordError('Invalid format');
      }
      setIsLoading(false);
      setUserAuthenticated(false);
    },
    retry: 1,
  });

  return mutate;
}

export default useUserLoginMutation;
