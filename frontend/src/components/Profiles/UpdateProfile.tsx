import { ChangeEvent, KeyboardEvent, FormEvent, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import { profileStore } from '../../store/profileStore';
import type { ProfileData } from '../../types/store/profileTypes';
import { verifyProfileLabelAvailability } from '../../utils/utils';
import useProfileUpdateMutation from '../../hooks/profiles/useProfileUpdateMutation';
import ErrorToast from '../ErrorToast';

function UpdateProfile({ profileObj }: { profileObj: ProfileData }) {
  const {
    selectedProfile,
    profilesData,
    updatedProfileLabel,
    setUpdatedProfileLabel,
    setIsUpdatingProfile,
    clearUpdatedProfileLabel,
  } = profileStore();

  const [errorToast, setErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState('');

  const mutateProfile = useProfileUpdateMutation({ profileObj });

  const handleUpdateProfile = async () => {
    try {
      verifyProfileLabelAvailability(updatedProfileLabel, profilesData);
      mutateProfile();
    } catch (error) {
      setErrorToastMessage((error as Error).message);
      setErrorToast(true);
      setTimeout(() => {
        setErrorToast(false);
      }, 2000);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      clearUpdatedProfileLabel();
      setIsUpdatingProfile(false);
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatedProfileLabel(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdateProfile();
  };

  const handleCancel = () => {
    setIsUpdatingProfile(false);
  };

  return (
    <div className="flexdiv">
      <form onSubmit={handleSubmit}>
        {profileObj.label === selectedProfile.label && (
          <button className=" bg-activeColor scale-110" type="button">
            <input
              type="text"
              key={profileObj.id}
              value={updatedProfileLabel}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              className="profile card outline-altColor outline-offset-0 relative"
            />
          </button>
        )}
        {errorToast && (
          <ErrorToast
            toastText={errorToastMessage}
            booleanProp={errorToast}
            widthProp="w-[100%]"
            topProp="sm:top-[-2.25rem] top-[-1.75rem]"
            centeringProp=""
          />
        )}
      </form>
      <div
        className="button_container flex sm:flex-row flex-col gap-2 absolute justify-center content-center items-center 
      sm:right-[-4rem] right-[-2.25rem]"
      >
        <button
          type="submit"
          onClick={handleUpdateProfile}
          className="text-validate"
        >
          <FaCheck className="sign h-5 w-5" />
        </button>
        <button type="button" onClick={handleCancel} className="text-warning">
          <ImCross className="sign h-[0.9rem] w-[0.9rem]" />
        </button>
      </div>
    </div>
  );
}

export default UpdateProfile;
