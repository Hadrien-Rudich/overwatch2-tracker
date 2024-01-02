import CancelNewGame from './CancelNewGame';
import { gameStore } from '../../../store/gameStore';
import CreateNewGame from './CreateGame';

function NewGameButtons() {
  const { isCreatingGame } = gameStore();

  return (
    <div className="NewGameButtons_container">
      {isCreatingGame && (
        <div className="flexdiv sm:gap-2 gap-1">
          <CreateNewGame />
          <CancelNewGame />
        </div>
      )}
    </div>
  );
}

export default NewGameButtons;
