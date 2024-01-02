import CancelGameEdit from './CancelGameEdit';
import UpdateGame from './UpdateGame';
import { gameStore } from '../../../store/gameStore';
import DeleteGame from './DeleteGame';
import EditGameMode from './EditGameMode';

import type { GameData } from '../../../types/store/gameTypes';

function EditGameButtons({ gameObj }: { gameObj: GameData }) {
  const { selectedGame, isUpdatingGame, isCreatingGame } = gameStore();

  return (
    <div
      className={`${
        gameObj.id === selectedGame.id ? 'flex' : 'hidden'
      } EditGameButtons_container`}
    >
      <div className="flex gap-1 justify-around">
        {!isUpdatingGame &&
        !isCreatingGame &&
        gameObj.id === selectedGame.id ? (
          <>
            <EditGameMode gameObj={gameObj} />
            <DeleteGame gameObj={gameObj} />
          </>
        ) : (
          !isCreatingGame &&
          gameObj.id === selectedGame.id && (
            <>
              <UpdateGame gameObj={gameObj} />
              <CancelGameEdit />
            </>
          )
        )}
      </div>
    </div>
  );
}

export default EditGameButtons;
