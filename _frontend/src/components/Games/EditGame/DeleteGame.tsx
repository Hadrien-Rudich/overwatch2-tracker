import { FaTrashAlt } from 'react-icons/fa';
import type { GameData } from '../../../types/store/gameTypes';
import useGameDeleteMutation from '../../../hooks/games/useGameDeleteMutation';

function DeleteGame({ gameObj }: { gameObj: GameData }) {
  const mutateGame = useGameDeleteMutation({ gameObj });

  const handleDeleteClick = () => {
    mutateGame();
  };
  return (
    <button type="button" onClick={handleDeleteClick} className=" text-warning">
      <FaTrashAlt className="sign lg:h-[1.4rem] lg:w-[1.4rem] h-[1.1rem] w-[1.1rem]" />
    </button>
  );
}

export default DeleteGame;
