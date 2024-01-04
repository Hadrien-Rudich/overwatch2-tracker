import { useState } from 'react';
import { gameStore } from '../../../../../store/gameStore';

import Date from '../Date';
import type { GameData } from '../../../../../types/store/gameTypes';
import DateWidget from './DateWidget';

function EditDate({ gameObj }: { gameObj: GameData }) {
  const { selectedGame } = gameStore();
  const [, setIsDropDownActive] = useState(false);

  return (
    <div className="EditDate_container relative flexdiv">
      {selectedGame.id !== gameObj.id ? (
        <Date gameObj={gameObj} />
      ) : (
        <div className="w-[75%] bg-activeColor">
          <DateWidget
            setIsDropDownActive={setIsDropDownActive}
            gameObj={gameObj}
          />
        </div>
      )}
    </div>
  );
}

export default EditDate;
