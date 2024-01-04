import { ChangeEvent, FormEvent, useState, KeyboardEvent, useRef } from 'react';
import { ImCross } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { verifyProfileLabelAvailability } from '../../utils/utils';
import { profileStore } from '../../store/profileStore';
// import useOutsideClick from '../useOutsideClick';
import useProfileAddMutation from '../../hooks/profiles/useProfileAddMutation';
import NewProfileMode from './NewProfileMode';
import ErrorToast from '../ErrorToast';

function AddProfile() {
  const {
    profilesData,
    newProfile,
    setNewProfile,
    clearNewProfile,
    setIsCreatingProfile,
  } = profileStore();
  const [inputField, setInputField] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState('');

  // const newProfileInputRef = useRef<HTMLInputElement>(null);

  const mutateProfile = useProfileAddMutation();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewProfile(event.target.value);
  };

  const handleCancel = () => {
    clearNewProfile();
    setInputField(false);
    setIsCreatingProfile(false);
  };

  const handleAddProfile = () => {
    try {
      verifyProfileLabelAvailability(newProfile, profilesData);
      mutateProfile();
      setInputField(false);
    } catch (error) {
      setErrorToastMessage((error as Error).message);
      setErrorToast(true);
      setTimeout(() => {
        setErrorToast(false);
      }, 2000);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddProfile();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div
      className="addprofile_container flexdiv"
      //  ref={newProfileInputRef}
    >
      {!inputField && <NewProfileMode setInputField={setInputField} />}
      {inputField && (
        <form onSubmit={handleSubmit}>
          <div className="form_container flexdiv relative">
            {errorToast && (
              <ErrorToast
                toastText={errorToastMessage}
                booleanProp={errorToast}
                widthProp="w-[100%]"
                topProp="sm:top-[-2.7rem] top-[-2.2rem]"
                centeringProp=" left-[-0%] right-[0%]"
              />
            )}
            <label htmlFor="newProfile">
              <input
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                // ref={newProfileInputRef}
                className="profile card outline-altColor outline-offset-0 scale-110"
                name="profile"
                required
                value={newProfile}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                type="text"
              />
            </label>
            <div
              className="button_container absolute flex sm:flex-row flex-col gap-2  justify-center content-center items-center 
      sm:right-[-4.25rem] right-[-2.45rem]"
            >
              <button
                type="submit"
                onClick={handleAddProfile}
                className="text-validate hover:scale-125"
              >
                <FaCheck className="sign h-5 w-5" />
              </button>
              <button
                onClick={handleCancel}
                type="button"
                className="text-warning hover:scale-125"
              >
                <ImCross className="sign h-[0.9rem] w-[0.9rem]" />
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddProfile;
