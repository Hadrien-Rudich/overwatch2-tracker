import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { filterStore } from '../../../../store/filterStore';
import { gameStore } from '../../../../store/gameStore';

interface FilterTabProps {
  filteredGamesNumber: number;
}

function FilterTab({ filteredGamesNumber }: FilterTabProps) {
  const { filterDropDown, setFilterDropDown } = filterStore();
  const { isUpdatingGame, setIsUpdatingGame, isFilteringGames, unselectGame } =
    gameStore();

  const toggleFilterDropDown = () => {
    unselectGame();
    setIsUpdatingGame(!isUpdatingGame);
    setFilterDropDown(!filterDropDown);
  };

  return (
    <div
      className={`${
        filterDropDown
          ? 'bg-activeColor shadow-md'
          : 'hover:bg-activeColor shadow-md'
      }
        Filters_container flexdiv w-full relative `}
    >
      <button
        className="w-full h-8"
        type="button"
        onClick={toggleFilterDropDown}
      >
        <div className="flexdiv relative ">
          <p className="sm:pl-2 pl-1 sm:text-base text-sm tracking-widest">
            FILTER ({filteredGamesNumber})
          </p>
          {filterDropDown ? (
            <MdOutlineKeyboardArrowUp className="w-4 h-4" />
          ) : (
            <MdOutlineKeyboardArrowDown className="w-4 h-4" />
          )}
        </div>
      </button>
    </div>
  );
}

export default FilterTab;
