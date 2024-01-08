import { filterStore } from '../../../../store/filterStore';
import { gameStore } from '../../../../store/gameStore';

function ClearAllTab() {
  const {
    clearDisplayedFilter,
    setFilterDropDown,
    clearExpandedFilter,
    clearFilteredHeroRole,
    clearFilteredHeroes,
    clearFilteredMapTypes,
    clearFilteredMaps,
    clearFilteredResults,
    clearIsFilteringGames,
  } = filterStore();
  const { setIsUpdatingGame } = gameStore();

  const handleClick = () => {
    clearDisplayedFilter();
    clearExpandedFilter();
    clearFilteredHeroRole();
    clearFilteredHeroes();
    clearFilteredMapTypes();
    clearFilteredMaps();
    clearFilteredResults();
    clearIsFilteringGames();
    setFilterDropDown(false);
    setIsUpdatingGame(false);
  };
  return (
    <div className="Filters_container relative flexdiv w-full h-8 z-20 rounded-sm hover:text-warning hover:bg-activeColor">
      <button type="button" className="flexdiv w-full " onClick={handleClick}>
        <div className="flexdiv w-full">
          <p className="sm:pl-2 pl-1 sm:text-base text-sm tracking-widest">
            Clear all
          </p>
        </div>
      </button>
    </div>
  );
}

export default ClearAllTab;
