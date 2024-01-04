// import { KeyboardEvent } from 'react';
import { FaTimes } from 'react-icons/fa';

import { gameStore } from '../../../store/gameStore';

function CancelNewGame() {
  const {
    setIsCreatingGame,
    setHeroesErrorToast,
    setResultErrorToast,
    setMapErrorToast,
  } = gameStore();

  const handleCancelCreation = () => {
    setIsCreatingGame(false);
    setHeroesErrorToast(false);
    setResultErrorToast(false);
    setMapErrorToast(false);
  };

  return (
    <button type="button" className="text-warning">
      <FaTimes
        onClick={handleCancelCreation}
        className="sign lg:h-[1.5rem] lg:w-[1.5rem] h-[1.2rem] w-[1.2rem]"
      />
    </button>
  );
}

export default CancelNewGame;
