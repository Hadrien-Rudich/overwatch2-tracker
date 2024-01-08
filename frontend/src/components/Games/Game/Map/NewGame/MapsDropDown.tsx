import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { gameStore } from '../../../../../store/gameStore';
import Map from '../Map';
import { gameDataStore } from '../../../../../store/gameDataStore';
import MapTypes from '../MapTypes';

interface MapsDropDownProps {
  toggleDropDown: () => void;
}

function MapsDropDown({ toggleDropDown }: MapsDropDownProps) {
  const { selectedGameMapType, selectedGameMap, selectGameMap } = gameStore();

  const { mapsData } = gameDataStore();

  const selectMap = (map: string, mapImage: string) => {
    selectGameMap(map, mapImage);
    toggleDropDown();
  };

  return (
    <div className="mapImage_container w-full absolute top-[-1rem] ring-2 ring-fourthColor bg-activeColor shadow-md rounded-sm">
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
        {selectedGameMap !== '' ? (
          <div className="currentMap_container bg-activeColor">
            {mapsData
              .filter((map) => map.label === selectedGameMap)
              .map((mapObj) => (
                <div key={mapObj.id}>
                  <Map mapObj={mapObj} imgHeight="h-8" />
                </div>
              ))}
          </div>
        ) : (
          <div className="h-8 flexdiv bg-activeColor">
            <p className="sm:text-lg text-sm truncate tracking-widest">MAP</p>
          </div>
        )}
      </div>
      <MdOutlineKeyboardArrowUp className="absolute h-8 w-8 top-0 right-0 pointer-events-none lg:block hidden" />
      <div className="mapsDropDown_container bg-mainColor">
        <div className="MapTypes_container sm:h-14 h-10 flexdiv">
          <MapTypes />
        </div>
        <div className="filteredMaps_container flex flex-col divide-y-2 divide-activeColor pb-[0.15rem]">
          {mapsData
            .filter((map) => map.type === selectedGameMapType)
            .map(
              (map) =>
                map.label !== selectedGameMap && (
                  <div key={map.label} className="map_container h-[3.6rem]">
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
