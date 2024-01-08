import NewGameMap from './Game/Map/NewGame/NewGameMap';
import NewGameHeroes from './Game/Heroes/NewGame/NewGameHeroes';
import NewGameResult from './Game/Result/NewGame/NewGameResult';
import NewGameDate from './Game/Date/Creation/NewGameDate';
import NewGameButtons from './NewGame/NewGameButtons';

function NewGame() {
  return (
    <div className="NewGame_container w-full tracking-widest z-50">
      <div
        role="button"
        tabIndex={0}
        className="w-full flexdiv border-[0.01rem] border-activeColor rounded-sm shadow-md"
      >
        <div className="newGame_container game relative">
          <div className="Map_container sm:w-[50%] w-[30%]">
            <NewGameMap />
          </div>
          <div className="Heroes_container flexdiv gap-0.5 sm:w-[30%] w-[35%]">
            <NewGameHeroes />
          </div>
          <div className="details_container flexdiv sm:w-[20%] w-[35%]">
            <div className="Result_container w-[35%] flexdiv">
              <NewGameResult />
            </div>
            <div className="Date_container w-[35%] flexdiv">
              <NewGameDate />
            </div>
            <div className="gamebuttons_container w-[30%] flexdiv">
              <NewGameButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewGame;
