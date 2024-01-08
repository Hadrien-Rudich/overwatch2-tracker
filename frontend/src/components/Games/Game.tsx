import { useEffect } from 'react';
import { gameStore } from '../../store/gameStore';
import { filterStore } from '../../store/filterStore';
import { filterGames } from '../../utils/utils';
import ExistingGame from './ExistingGame';
import NewGameMode from './NewGame/NewGameMode';
import NewGame from './NewGame';
import Filters from './Filters/Filters';
import { useHeroesQueries } from '../../hooks/queries/useHeroesQueries';
import { useMapsQueries } from '../../hooks/queries/useMapsQueries';
import FiltersTabs from './Filters/FiltersTabs';
import NotFound from '../NotFound';

function Game() {
  useHeroesQueries();
  useMapsQueries();

  const {
    gamesData,
    isCreatingGame,
    isUpdatingGame,
    setIsUpdatingGame,
    setIsCreatingGame,
    clearNewGame,
  } = gameStore();

  const {
    filterDropDown,
    filteredHeroes,
    filteredMaps,
    filteredResults,
    setIsFilteringGames,
    isFilteringGames,
  } = filterStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsUpdatingGame(false);
        setIsCreatingGame(false);
        clearNewGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsUpdatingGame, setIsCreatingGame, clearNewGame]);

  useEffect(() => {
    if (
      filteredHeroes.length !== 0 ||
      filteredMaps.length !== 0 ||
      filteredResults.length !== 0
    ) {
      setIsFilteringGames(true);
    } else {
      setIsFilteringGames(false);
    }
  }, [filteredHeroes, filteredMaps, filteredResults, setIsFilteringGames]);

  const filteredGames = filterGames(
    gamesData,
    filteredHeroes,
    filteredMaps,
    filteredResults
  );

  return (
    <div className="games_container flexdiv col tracking-wider z-30 w-full">
      <div
        className={`${
          isUpdatingGame ? 'grayscale pointer-events-none' : ''
        }  CreateGame_container w-full flexdiv h-12 mb-12`}
      >
        {!isCreatingGame ? <NewGameMode /> : <NewGame />}
      </div>
      <div className="existingGames_container flexdiv col w-full relative">
        {filteredGames.length !== 0 && (
          <>
            <Filters filteredGamesNumber={filteredGames.length} />
            {filterDropDown && <FiltersTabs />}
            {filteredGames.map((game) => (
              <ExistingGame gameObj={game} key={game.id} />
            ))}
          </>
        )}

        {filteredGames.length === 0 && isFilteringGames && (
          <>
            <Filters filteredGamesNumber={filteredGames.length} />
            {filterDropDown && <FiltersTabs />}
            <NotFound
              propText="NO GAMES FOUND, ADJUST FILTERS"
              topPosition="lg:top-[-11.5rem] top-[-9.4rem]"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Game;
