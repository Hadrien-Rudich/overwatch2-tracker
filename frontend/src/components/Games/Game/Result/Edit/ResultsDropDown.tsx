import { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { gameStore } from '../../../../../store/gameStore';
import { getResultClassNameFromResult } from '../../../../../utils/classNameUtils';
import type { GameData } from '../../../../../types/store/gameTypes';
import Result from '../Result';

interface ResultsDropDownProps {
  gameObj: GameData;
  toggleDropDown: () => void;
}

function ResultsDropDown({ gameObj, toggleDropDown }: ResultsDropDownProps) {
  const { selectedGame, selectGameCurrentResult, updateSelectedGame } =
    gameStore();

  const results = [{ label: 'Win' }, { label: 'Loss' }, { label: 'Draw' }];
  const isLargeScreen = window.innerWidth > 768;

  const [currentGame, setCurrentGame] = useState<GameData>(gameObj);

  useEffect(() => {
    setCurrentGame((prevGame) => ({
      ...prevGame,
      result: selectedGame.result,
    }));
  }, [selectedGame.result]);

  const selectResult = (result: string) => {
    const formattedResult = result.toLowerCase();
    selectGameCurrentResult(formattedResult);
    updateSelectedGame({ ...selectedGame, result: formattedResult });
    toggleDropDown();
  };

  return (
    <div className="ResultsDropDown_container w-[75%] ring-2 ring-thirdColor absolute top-[-1rem] shadow-md rounded-sm">
      <button
        className={`${getResultClassNameFromResult(
          currentGame.result.charAt(0).toUpperCase() +
            currentGame.result.slice(1)
        )} w-full relative`}
        type="button"
        onClick={toggleDropDown}
      >
        <div className="w-[133.33%]">
          <Result gameObj={currentGame} />
        </div>
      </button>
      <MdOutlineKeyboardArrowUp className="absolute h-4 w-4 top-[0.5rem] xl:right-0 right-[-0.1rem] pointer-events-none lg:block hidden" />

      <ul className="results_container">
        {results.map(
          (result) =>
            result.label.toLowerCase() !==
              selectedGame.result.toLowerCase() && (
              <li key={(gameObj.id, result.label)}>
                <button
                  type="button"
                  className={`w-full h-8 bg-activeColor bg-active${result.label} hover:bg-activeColor`}
                  onClick={() => selectResult(result.label)}
                  id={result.label}
                >
                  <p className="tracking-widest">
                    {isLargeScreen ? result.label : result.label.slice(0, 1)}
                  </p>
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default ResultsDropDown;
