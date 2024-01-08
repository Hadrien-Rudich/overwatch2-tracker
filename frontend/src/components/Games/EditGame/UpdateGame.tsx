import { useState, FormEvent } from 'react';
import { FaCheck } from 'react-icons/fa';
import { gameStore } from '../../../store/gameStore';
import type { GameData } from '../../../types/store/gameTypes';
import useGameUpdateMutation from '../../../hooks/games/useGameUpdateMutation';
import ErrorToast from '../../ErrorToast';
import { GameUpdateSchema } from '../../../validation/dataValidation';

function UpdateGame({ gameObj }: { gameObj: GameData }) {
  const {
    selectedGameResult,
    selectedGameDateInFormat,
    selectedGameMap,
    selectedGameHeroes,
  } = gameStore();

  const [errorToast, setErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState('');

  const mutateGame = useGameUpdateMutation({ gameObj });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      gameObj.result === selectedGameResult &&
      gameObj.date === selectedGameDateInFormat &&
      gameObj.map === selectedGameMap &&
      gameObj.heroes === selectedGameHeroes
    ) {
      setErrorToastMessage('Game is identical');
      setErrorToast(true);
      setTimeout(() => {
        setErrorToast(false);
      }, 2000);

      return;
    }

    const results = GameUpdateSchema.safeParse({
      result: selectedGameResult,
      map: selectedGameMap,
      heroes: selectedGameHeroes,
      date: selectedGameDateInFormat,
    });

    if (results.success) {
      mutateGame();
    } else if (!results.success) {
      results.error.errors.forEach((error) => {
        switch (error.path[0]) {
          case 'heroes':
            setErrorToast(true);
            setErrorToastMessage(error.message);
            break;
          default:
            break;
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} action="submit">
      <button type="submit" className="text-validate hover:scale-110">
        <FaCheck className="sign lg:h-[1.5rem] lg:w-[1.5rem] h-[1.2rem] w-[1.2rem]" />
      </button>
      {errorToast && (
        <ErrorToast
          toastText={errorToastMessage}
          booleanProp={errorToast}
          widthProp="sm:w-[10%] w-[20%]"
          topProp="sm:top-[-2rem] top-[-1.45rem]"
          centeringProp="right-0"
        />
      )}
    </form>
  );
}

export default UpdateGame;
