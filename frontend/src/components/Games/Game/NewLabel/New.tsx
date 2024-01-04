import { dateNowInGameFormat } from '../../../../utils/utils';
import type { GameData } from '../../../../types/store/gameTypes';

function New({ gameObj }: { gameObj: GameData }) {
  return (
    <p
      className={`${
        gameObj.date.slice(0, 5) === dateNowInGameFormat()
          ? 'block absolute right-2 top-[0.85rem] px-1 bg-secondaryColor text-new text-sm rotate-[-45deg] tracking-widest'
          : 'hidden'
      }`}
    >
      NEW
    </p>
  );
}

export default New;
