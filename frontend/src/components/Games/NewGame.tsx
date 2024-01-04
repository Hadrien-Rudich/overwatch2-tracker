import NewGameMap from './Game/Map/NewGame/NewGameMap';
import NewGameHeroes from './Game/Heroes/NewGame/NewGameHeroes';
import NewGameResult from './Game/Result/NewGame/NewGameResult';
import NewGameDate from './Game/Date/Creation/NewGameDate';
import NewGameButtons from './NewGame/NewGameButtons';
import { useHeroesQueries } from '../../hooks/queries/useHeroesQueries';
import { useMapsQueries } from '../../hooks/queries/useMapsQueries';

function NewGame() {
  useHeroesQueries();
  useMapsQueries();

  return (
    <div className="NewGame_container w-full tracking-widest z-50">
      <div
        role="button"
        tabIndex={0}
        className="w-full flexdiv border-[0.01rem] border-activeColor shadow-md"
      >
        <div className="newGame_container game relative">
          <div className="Map_container sm:w-[50%] w-[30%]">
            {/* <div className="Map_container md:w-[40%] w-[30%]"> */}
            <NewGameMap />
          </div>
          <div className="Heroes_container flexdiv gap-0.5 sm:w-[30%] w-[35%]">
            {/* <div className="Heroes_container flex sm:justify-center justify-start gap-0.5 w-[40%] relative"> */}
            <NewGameHeroes />
          </div>
          <div className="details_container flexdiv sm:w-[20%] w-[35%]">
            {/* <div className="details_container flex md:justify-center justify-start items-center md:w-[20%] w-[30%]"> */}
            <div className="Result_container w-[35%] flexdiv">
              {/* <div className="Result_container w-[35%]"> */}
              <NewGameResult />
            </div>
            <div className="Date_container w-[35%] flexdiv">
              {/* <div className="Date_container w-[35%]"> */}
              <NewGameDate />
            </div>
            <div className="gamebuttons_container w-[30%] flexdiv">
              {/* <div className="gamebuttons_container flex  justify-around w-[30%]"> */}
              <NewGameButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewGame;
