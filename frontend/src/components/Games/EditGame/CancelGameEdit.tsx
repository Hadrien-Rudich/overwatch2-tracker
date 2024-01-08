// import { KeyboardEvent } from 'react';
import { FaTimes } from 'react-icons/fa';
import { gameStore } from '../../../store/gameStore';

function CancelGameEdit() {
  const { setIsUpdatingGame } = gameStore();

  const handleCancelEdit = () => {
    setIsUpdatingGame(false);
  };

  return (
    <button type="button" className="text-warning">
      <FaTimes
        onClick={handleCancelEdit}
        className="sign lg:h-[1.5rem] lg:w-[1.5rem] h-[1.2rem] w-[1.2rem]"
      />
    </button>
  );
}

export default CancelGameEdit;
