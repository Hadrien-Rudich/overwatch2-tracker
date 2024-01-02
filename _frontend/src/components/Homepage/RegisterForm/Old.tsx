// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../InputField';
import useUserRegisterMutation from '../../hooks/users/useUserRegisterMutation';
import LoadingSpinner from '../LoadingSpinner';
import PwdFormat from './PwdFormat';
import { RegisterSchema } from '../../validation/dataValidation';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [battleTag, setBattleTag] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [createUser, setCreateUser] = useState(false);
  const [
    ,
    // isLoading
    setIsLoading,
  ] = useState(false);
  // const [battleTagError, setBattleTagError] = useState('');
  // const [battleTagIsInvalid, setBattleTagIsInvalid] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [oneLowerCase, setOneLowerCase] = useState(false);
  const [oneUpperCase, setOneUpperCase] = useState(false);
  const [oneDigit, setOneDigit] = useState(false);
  const [oneSpecialChar, setOneSpecialChar] = useState(false);
  const [eightToTwentyChars, setEightToTwentyChars] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const [passwordDoesNotMatch, setPasswordDoesNotMatch] = useState(false);
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const [emailAlreadyInUseError, setEmailAlreadyInUseError] = useState('');

  const mutateUser = useUserRegisterMutation({
    email,
    password,
    // battleTag,
    setCreateUser,
    setIsLoading,
    setEmailAlreadyInUse,
    setEmailAlreadyInUseError,
  });

  const verifyPasswordFormat = (userPassword: string) => {
    // Reset all flags to false initially
    setOneLowerCase(false);
    setOneUpperCase(false);
    setOneDigit(false);
    setOneSpecialChar(false);
    setEightToTwentyChars(false);

    if (userPassword.match(/[a-z]/)) {
      setOneLowerCase(true);
    }
    if (userPassword.match(/[A-Z]/)) {
      setOneUpperCase(true);
    }
    if (userPassword.match(/[0-9]/)) {
      setOneDigit(true);
    }
    if (userPassword.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      setOneSpecialChar(true);
    }
    if (userPassword.length >= 8 && userPassword.length <= 20) {
      setEightToTwentyChars(true);
    }
  };

  const navigate = useNavigate();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // const handleBattleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setBattleTag(event.target.value);
  // };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
      //  battleTag,
      password,
    });

    if (!results.success) {
      results.error.errors.forEach((error) => {
        switch (error.path[0]) {
          // case 'battleTag':
          //   setBattleTagError(error.message);
          //   setBattleTagIsInvalid(true);
          //   break;
          case 'password':
            setPasswordError(error.message);
            setPasswordIsInvalid(true);
            break;
          default:
            break;
        }
      });
      return;
    }

    if (
      RegisterSchema.parse({
        email,
        //  battleTag,
        password,
      })
    ) {
      setCreateUser(true);
      setIsLoading(true);

      mutateUser();
    }
  };

  return (
    <div className="register_container flexdiv row lg:mt-44 my-24">
      <form onSubmit={handleRegister}>
        <div className=" inputandbutton_container containerbox">
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
            {/* <InputField
              label="BattleTag"
              type="text"
              value={battleTag}
              required
              onChange={handleBattleTagChange}
              invalid={battleTagIsInvalid}
              setInvalid={setBattleTagIsInvalid}
              invalidMessage={battleTagError}
            /> */}
            <div className="group relative">
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
              <PwdFormat
                oneLowerCase
                oneUpperCase
                oneDigit
                oneSpecialChar
                eightToTwentyChars
              />
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
