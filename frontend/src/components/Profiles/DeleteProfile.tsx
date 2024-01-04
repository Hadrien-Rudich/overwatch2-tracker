import { FaTrashAlt } from 'react-icons/fa';
import type { ProfileData } from '../../types/store/profileTypes';
import useProfileDeleteMutation from '../../hooks/profiles/useProfileDeleteMutation';

function DeleteProfile({ profileObj }: { profileObj: ProfileData }) {
  const mutateProfile = useProfileDeleteMutation({ profileObj });

  const handleDeleteClick = async () => {
    mutateProfile();
  };

  return (
    <button
      value={profileObj.label}
      onClick={handleDeleteClick}
      type="button"
      className=" absolute text-warning top-3 right-[-2.25rem]"
    >
      <FaTrashAlt className="sign h-[1rem] w-[1rem]" />
    </button>
  );
}

export default DeleteProfile;
