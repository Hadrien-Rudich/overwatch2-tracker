import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { gameStore } from '../../../../../store/gameStore';
import type { GameData } from '../../../../../types/store/gameTypes';
import Map from '../Map';
import MapsDropDown from './MapsDropDown';

function EditMap({ gameObj }: { gameObj: GameData }) {
  const { selectedGame, selectedGameMap } = gameStore();

  const [isDropDownActive, setIsDropDownActive] = useState(false);

  const toggleDropDown = () => setIsDropDownActive(!isDropDownActive);

  if (selectedGame.id !== gameObj.id) {
    return <Map gameObj={gameObj} imgHeight="h-12" />;
  }

  return (
    <div className="EditMap_container flexdiv pl-[0.05rem] sm:pl-[0.25rem]">
      <div className="relative w-[95%] ">
        <div className="w-full">
          {isDropDownActive ? (
            <MapsDropDown gameObj={gameObj} toggleDropDown={toggleDropDown} />
          ) : (
            <div className="mapimage_container flexdiv">
              {/* {selectedGameMap === selectedGame.map ? (
              <button
                className="w-full relative ring-2"
                type="button"
                onClick={toggleDropDown}
              >
                <Map gameObj={selectedGame} imgHeight="h-8" />
                <div className="map_container flexdiv">
                  <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flexdiv px-1 bg-mainText bg-opacity-40 h-8 w-1/4">
                    <p className="text-xl absolute truncate tracking-wider text-secondaryText">
                      {selectedGame.map}
                    </p>
                  </div>
                </div>
              </button>
            ) : ( */}
              <button
                className="w-full relative ring-2 shadow-md"
                type="button"
                onClick={toggleDropDown}
              >
                <Map gameObj={selectedGame} imgHeight="h-8" />
                <div className="map_container flexdiv">
                  <div className="flexdiv absolute  top-0 left-0 sm:px-1 px-0.5 bg-mainText bg-opacity-40 sm:h-6 h-4">
                    <p className=" text-activeColor sm:text-base text-sm sm:tracking-widest tracking-wider">
                      {selectedGame.map}
                    </p>
                  </div>
                </div>
              </button>
              {/* )} */}
              <MdOutlineKeyboardArrowDown className="absolute h-8 w-8 top-0 right-0 pointer-events-none lg:block hidden" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditMap;
