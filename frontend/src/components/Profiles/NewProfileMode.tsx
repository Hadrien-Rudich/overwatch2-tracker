import { MouseEvent } from 'react';
import { ImPlus } from 'react-icons/im';

import { profileStore } from '../../store/profileStore';

function NewProfileMode({
  setInputField,
}: {
  setInputField: (value: boolean) => void;
}) {
  const { unselectProfile, setIsUpdatingProfile, setIsCreatingProfile } =
    profileStore();

  const handlePlusClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsUpdatingProfile(false);
    setIsCreatingProfile(true);
    setInputField(true);
    unselectProfile();
  };

  return (
    <button
      type="button"
      className="addbutton_container hover:scale-110 flexdiv gap-4 sign"
      onClick={handlePlusClick}
    >
      <ImPlus className="lg:h-[1.35rem] lg:w-[1.35rem] h-[1.55rem] w-[1.55rem]" />
      <p className=" text-2xl">NEW PROFILE</p>
      <span className="sr-only">Add new profile</span>
    </button>
  );
}

export default NewProfileMode;
