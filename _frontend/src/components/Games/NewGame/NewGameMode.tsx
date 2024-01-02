import { ImPlus } from 'react-icons/im';
import CreateMockGames from '../CreateMockGames';
import { gameStore } from '../../../store/gameStore';

function NewGameMode() {
  const { setIsCreatingGame, clearNewGame } = gameStore();

  const handleCreation = () => {
    clearNewGame();
    setIsCreatingGame(true);
  };

  return (
    <div className="flex justify-around bg-mainColor w-full h-12  rounded-sm">
      <button
        className="sign flexdiv gap-4"
        type="button"
        onClick={handleCreation}
      >
        <ImPlus className="lg:h-[1.35rem] lg:w-[1.35rem] h-[1.55rem] w-[1.55rem]" />
        <p className=" text-2xl">NEW GAME</p>
        <span className="sr-only">Add new game</span>
      </button>
      <CreateMockGames />
    </div>
  );
}

export default NewGameMode;
