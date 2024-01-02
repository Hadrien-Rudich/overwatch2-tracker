import { FormEvent } from 'react';
import { FaCheck } from 'react-icons/fa';
import useGameAddMutation from '../../../hooks/games/useGameAddMutation';
import { gameStore } from '../../../store/gameStore';
import { NewGameSchema } from '../../../validation/dataValidation';

function CreateNewGame() {
  const {
    selectedGameHeroes,
    selectedGameMap,
    selectedGameResult,
    selectedGameDateInFormat,
    setGameSavedToast,
    setIsCreatingGame,
    setMapErrorToastMessage,
    setMapErrorToast,
    setHeroesErrorToastMessage,
    setHeroesErrorToast,
    setDateErrorToastMessage,
    setDateErrorToast,
    setResultErrorToastMessage,
    setResultErrorToast,
  } = gameStore();

  const mutateGame = useGameAddMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const results = NewGameSchema.safeParse({
      result: selectedGameResult,
      map: selectedGameMap,
      heroes: selectedGameHeroes,
      date: selectedGameDateInFormat,
    });

    if (results.success) {
      mutateGame();
      setIsCreatingGame(false);
    } else if (!results.success) {
      results.error.errors.forEach((error) => {
        switch (error.path[0]) {
          case 'heroes':
            setHeroesErrorToast(true);
            setHeroesErrorToastMessage(error.message);
            break;
          case 'date':
            setDateErrorToast(true);
            setDateErrorToastMessage(error.message);
            break;
          case 'result':
            setResultErrorToast(true);
            setResultErrorToastMessage(error.message);
            break;
          case 'map':
            setMapErrorToast(true);
            setMapErrorToastMessage(error.message);
            break;
          default:
            break;
        }
      });
    }

    setGameSavedToast(false);
  };

  return (
    <form onSubmit={handleSubmit} action="submit">
      <button type="submit" className="text-validate">
        <FaCheck className="sign lg:h-[1.5rem] lg:w-[1.5rem] h-[1.2rem] w-[1.2rem]" />
      </button>
    </form>
  );
}

export default CreateNewGame;
