import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { gameStore } from '../../../../../store/gameStore';
import type { GameData } from '../../../../../types/store/gameTypes';
import Heroes from '../Heroes';
import HeroesDropDown from './HeroesDropDown';

function EditHeroes({ gameObj }: { gameObj: GameData }) {
  const { selectedGame, selectedGameHeroes } = gameStore();

  const [isDropDownActive, setIsDropDownActive] = useState(false);

  const toggleDropDown = () => setIsDropDownActive(!isDropDownActive);

  if (selectedGame.id !== gameObj.id) {
    return <Heroes gameObj={gameObj} imgHeight="sm:h-[2.25rem] h-[2rem]" />;
  }
  return (
    <div className="EditHeroes_container relative flexdiv w-[90%]">
      <div className="w-full relative">
        {isDropDownActive ? (
          <HeroesDropDown gameObj={gameObj} toggleDropDown={toggleDropDown} />
        ) : (
          <div className="heroesImages_container w-full flexdiv">
            {/* {selectedGameHeroes === selectedGame.heroes ? (
              <button
                className="w-full relative ring-2"
                type="button"
                onClick={toggleDropDown}
              >
                <Heroes gameObj={selectedGame} imgHeight="h-8" />
              </button>
            ) : ( */}
            <button
              className="w-full relative ring-2 shadow-md"
              type="button"
              onClick={toggleDropDown}
            >
              <Heroes gameObj={selectedGame} imgHeight="h-8" />
            </button>
            {/* )} */}
            <MdOutlineKeyboardArrowDown className="absolute h-8 w-8 top-0 right-0 pointer-events-none lg:block hidden" />
          </div>
        )}
      </div>
    </div>
  );
}

export default EditHeroes;
