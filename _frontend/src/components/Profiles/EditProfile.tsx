import { MouseEvent } from 'react';
import { RiEditFill } from 'react-icons/ri';
import { profileStore } from '../../store/profileStore';
import type { ProfileData } from '../../types/store/profileTypes';

function EditProfile({ profileObj }: { profileObj: ProfileData }) {
  const { setIsUpdatingProfile, setUpdatedProfileLabel } = profileStore();

  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    setUpdatedProfileLabel(event.currentTarget.value);
    setIsUpdatingProfile(true);
  };
  return (
    <button
      type="button"
      value={profileObj.label}
      onClick={handleEditClick}
      className="absolute top-[0.65rem] left-[-0.1rem]"
    >
      <RiEditFill className="sign h-5 w-5" />
    </button>
  );
}

export default EditProfile;
