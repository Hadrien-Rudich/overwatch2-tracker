import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../InputField';
import useUserRegisterMutation from '../../../hooks/users/useUserRegisterMutation';
import LoadingSpinner from '../../LoadingSpinner';
import PwdFormat from '../PwdFormat';
import { RegisterSchema } from '../../../validation/dataValidation';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createUser, setCreateUser] = useState(false);
  const [, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [passwordDoesNotMatch, setPasswordDoesNotMatch] = useState(false);
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const [emailAlreadyInUseError, setEmailAlreadyInUseError] = useState('');

  const [oneLowerCase, setOneLowerCase] = useState(false);
  const [oneUpperCase, setOneUpperCase] = useState(false);
  const [oneDigit, setOneDigit] = useState(false);
  const [oneSpecialChar, setOneSpecialChar] = useState(false);
  const [eightToTwentyChars, setEightToTwentyChars] = useState(false);

  const mutateUser = useUserRegisterMutation({
    email,
    password,
    setCreateUser,
    setIsLoading,
    setEmailAlreadyInUse,
    setEmailAlreadyInUseError,
  });

  const verifyPasswordFormat = (userPassword: string) => {
    setOneLowerCase(!!userPassword.match(/[a-z]/));
    setOneUpperCase(!!userPassword.match(/[A-Z]/));
    setOneDigit(!!userPassword.match(/[0-9]/));
    setOneSpecialChar(
      !!userPassword.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/)
    );
    setEightToTwentyChars(
      userPassword.length >= 8 && userPassword.length <= 20
    );
  };

  const navigate = useNavigate();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    verifyPasswordFormat(newPassword);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleCancelClick = () => {
    navigate('/');
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordDoesNotMatch(true);
      return;
    }

    const results = RegisterSchema.safeParse({
      email,
      password,
    });

    if (!results.success) {
      results.error.errors.forEach((error) => {
        if (error.path[0] === 'password') {
          setPasswordError(error.message);
          setPasswordIsInvalid(true);
        }
      });
      return;
    }

    if (RegisterSchema.parse({ email, password })) {
      setCreateUser(true);
      setIsLoading(true);
      setTimeout(() => {
        mutateUser();
      }, 500);
    }
  };

  return (
    <div className="register_container flexdiv row lg:mt-44 my-24">
      <form onSubmit={handleRegister}>
        <div className="inputandbutton_container containerbox">
          <div className="input_container flexdiv col gap-4">
            <InputField
              label="Email"
              type="email"
              value={email}
              required
              onChange={handleEmailChange}
              invalid={emailAlreadyInUse}
              setInvalid={setEmailAlreadyInUse}
              invalidMessage={emailAlreadyInUseError}
            />
            <div className="relative">
              <InputField
                label="Password"
                type="password"
                value={password}
                required
                onChange={handlePasswordChange}
                invalid={passwordIsInvalid}
                setInvalid={setPasswordIsInvalid}
                invalidMessage={passwordError}
              />
              <div className="group">
                <PwdFormat
                  oneLowerCase={oneLowerCase}
                  oneUpperCase={oneUpperCase}
                  oneDigit={oneDigit}
                  oneSpecialChar={oneSpecialChar}
                  eightToTwentyChars={eightToTwentyChars}
                />
              </div>
            </div>

            <InputField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              required
              onChange={handleConfirmPasswordChange}
              invalid={passwordDoesNotMatch}
              setInvalid={setPasswordDoesNotMatch}
              invalidMessage="Passwords do not match"
            />
          </div>
          <div className="button_container flexdiv gap-6 relative h-10">
            {!createUser ? (
              <div className="flexdiv gap-6">
                <button
                  onClick={handleCancelClick}
                  type="button"
                  className="button cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="button validate">
                  Register
                </button>
              </div>
            ) : (
              <div className="absolute top-[-2]">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
