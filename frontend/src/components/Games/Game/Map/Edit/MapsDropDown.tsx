import { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { gameStore } from '../../../../../store/gameStore';
import type { GameData } from '../../../../../types/store/gameTypes';
import Map from '../Map';
import { gameDataStore } from '../../../../../store/gameDataStore';
import MapTypes from '../MapTypes';

interface MapsDropDownProps {
  gameObj: GameData;
  toggleDropDown: () => void;
}

function MapsDropDown({ gameObj, toggleDropDown }: MapsDropDownProps) {
  const {
    selectedGame,
    selectedGameMapType,
    selectGameMap,
    updateSelectedGame,
  } = gameStore();

  const { mapsData } = gameDataStore();
  const [currentGame, setCurrentGame] = useState(gameObj);

  useEffect(() => {
    setCurrentGame((prevGame) => ({
      ...prevGame,
      map: selectedGame.map,
      mapImageUrl: selectedGame.mapImageUrl,
    }));
  }, [selectedGame.map, selectedGame.mapImageUrl]);

  const selectMap = (map: string, mapImage: string) => {
    selectGameMap(map, mapImage);
    updateSelectedGame({ ...selectedGame, map, mapImageUrl: mapImage });
    toggleDropDown();
  };

  return (
    <div className="mapImage_container w-full absolute top-[-1rem] ring-2  ring-thirdColor bg-mainColor shadow-md rounded-sm">
      <div
        className="h-8 w-full relative "
        onClick={toggleDropDown}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            toggleDropDown();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="currentMap_container">
          <Map gameObj={currentGame} imgHeight="h-8" />
          <div className="flexdiv absolute  top-0 left-0 sm:px-1 px-0.5 bg-mainText bg-opacity-40 sm:h-6 h-4">
            <p className=" text-activeColor sm:text-base text-sm sm:tracking-widest tracking-wider">
              {currentGame.map}
            </p>
          </div>
        </div>
      </div>
      <MdOutlineKeyboardArrowUp className="absolute h-8 w-8 top-0 right-0 pointer-events-none lg:block hidden" />
      <div className="mapsDropDown_container">
        <div className="MapTypes_container sm:h-14 h-10 flexdiv">
          <MapTypes />
        </div>
        <div className="filteredMaps_container flex flex-col divide-y-2 divide-activeColor pb-[0.15rem]">
          {mapsData
            .filter((map) => map.type === selectedGameMapType)
            .map(
              (map) =>
                map.label.toLowerCase() !== selectedGame.map.toLowerCase() && (
                  <div
                    key={(gameObj.id, map.label)}
                    className="map_container h-[3.6rem]"
                  >
                    <button
                      type="button"
                      className="w-full h-14"
                      onClick={() => selectMap(map.label, map.imageUrl)}
                    >
                      <Map mapObj={map} imgHeight="h-14" />
                    </button>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default MapsDropDown;
