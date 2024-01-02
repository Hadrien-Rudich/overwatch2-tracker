import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { gameStore } from '../../../../../store/gameStore';
import { getResultClassNameFromResult } from '../../../../../utils/classNameUtils';

interface ResultsDropDownProps {
  toggleDropDown: () => void;
}

function ResultsDropDown({ toggleDropDown }: ResultsDropDownProps) {
  const {
    selectedGame,
    selectGameCurrentResult,
    updateSelectedGame,
    selectedGameResult,
  } = gameStore();

  const results = [{ label: 'Win' }, { label: 'Loss' }, { label: 'Draw' }];
  const isLargeScreen = window.innerWidth > 768;

  const selectResult = (result: string) => {
    const formattedResult = result.toLowerCase();
    selectGameCurrentResult(formattedResult);
    updateSelectedGame({ ...selectedGame, result: formattedResult });
    toggleDropDown();
  };

  return (
    <div className="ResultsDropDown_container w-[75%] ring-2 ring-fourthColor absolute top-[-1rem] shadow-md">
      {selectedGameResult !== '' && (
        <button
          className={`${getResultClassNameFromResult(
            selectedGameResult
          )} w-full relative h-8`}
          type="button"
          onClick={toggleDropDown}
        >
          <p>
            {isLargeScreen
              ? selectedGameResult
              : selectedGameResult.slice(0, 1)}
          </p>
        </button>
      )}

      <MdOutlineKeyboardArrowUp className="absolute h-4 w-4 top-[0.5rem] right-[-0.1rem] pointer-events-none lg:block hidden" />
      <ul className="results_container">
        {results.map(
          (result) =>
            result.label.toLowerCase() !== selectedGameResult && (
              <li key={result.label}>
                <button
                  type="button"
                  className={`w-full bg-activeColor bg-active${result.label} hover:bg-activeColor h-8`}
                  onClick={() => selectResult(result.label)}
                  id={result.label}
                >
                  {isLargeScreen ? result.label : result.label.slice(0, 1)}
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default ResultsDropDown;
