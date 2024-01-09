import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../InputField';
import { authStore } from '../../store/authStore';
import LoadingSpinner from '../LoadingSpinner';
import useUserLoginMutation from '../../hooks/account/useUserLoginMutation';
import { LoginSchema } from '../../validation/dataValidation';
import SuccessToast from '../SuccessToast';

function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidPasswordError, setInvalidPasswordError] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const [userNotFoundError, setUserNotFoundError] = useState('');
  const [
    ,
    // isLoading
    setIsLoading,
  ] = useState(false);

  const {
    isLoggedIn,
    userCreatedToastMessage,
    userCreatedToast,
    setUserCreatedToast,
    setUserCreatedToastMessage,
  } = authStore();
  const navigate = useNavigate();

  const mutateUser = useUserLoginMutation({
    email,
    password,
    setUserAuthenticated,
    setInvalidPassword,
    setInvalidPasswordError,
    setUserNotFound,
    setUserNotFoundError,
    setIsLoading,
  });

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleCancel = () => {
    navigate('/');
  };

  function handleLogIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const results = LoginSchema.safeParse({ email, password });

    if (results.success) {
      setUserAuthenticated(true);
      mutateUser();
    } else if (!results.success) {
      results.error.errors.forEach((error) => {
        switch (error.path[0]) {
          case 'password':
            setInvalidPasswordError(error.message);
            setInvalidPassword(true);
            break;
          default:
            break;
        }
      });
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profiles');
    }
  }, [isLoggedIn, navigate]);

  return (
    <form onSubmit={handleLogIn}>
      <div className="login_container flexdiv lg:mt-44 my-24">
        <div className=" inputandbutton_container containerbox ">
          <div className="input_container flexdiv col gap-4 ">
            <InputField
              label="email"
              type="email"
              value={email}
              required
              onChange={handleEmailChange}
              invalid={userNotFound}
              setInvalid={setUserNotFound}
              invalidMessage={userNotFoundError}
            />

            <InputField
              label="password"
              type="password"
              value={password}
              required
              onChange={handlePasswordChange}
              invalid={invalidPassword}
              setInvalid={setInvalidPassword}
              invalidMessage={invalidPasswordError}
            />
          </div>
          <div className="button_container flexdiv gap-6">
            {!userAuthenticated ? (
              <div className="flexdiv gap-6">
                <button
                  onClick={handleCancel}
                  type="button"
                  className="button cancel "
                >
                  <p className="">Cancel</p>
                </button>
                <button type="submit" className="button validate">
                  <p className="">Log in</p>
                </button>
              </div>
            ) : (
              <div className="absolute top-[-2]">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
        {userCreatedToast && (
          <SuccessToast
            toastText={userCreatedToastMessage}
            setToastText={setUserCreatedToastMessage}
            isVisible={userCreatedToast}
            setIsVisible={setUserCreatedToast}
          />
        )}
      </div>
    </form>
  );
}

export default LogInForm;
