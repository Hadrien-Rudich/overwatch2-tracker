/* eslint-disable react/require-default-props */
import type { GameData } from '../../../../types/store/gameTypes';
import type { MapData } from '../../../../types/store/gameDataTypes';
import { capitalizeFirstLetter } from '../../../../utils/utils';
import { gameStore } from '../../../../store/gameStore';

interface MapProps {
  gameObj?: GameData;
  mapObj?: MapData;
  imgHeight: string;
}

function Map({ gameObj, mapObj, imgHeight }: MapProps) {
  const { isUpdatingGame, isCreatingGame } = gameStore();
  return (
    <>
      {gameObj && !isUpdatingGame && !isCreatingGame ? (
        <div className="">
          <img
            className={`${imgHeight} w-full object-cover rounded-sm rounded-r-none`}
            src={`images/maps/${gameObj.mapImageUrl}`}
            alt=""
          />

          <div className="absolute inset-0">
            <div className="flexdiv absolute  top-0 left-0 text-secondaryText sm:px-1 px-0.5 bg-mainText bg-opacity-40 xl:w-[15%] lg:w-[18%] sm:w-[22%] sm:h-12 h-4">
              <div className="flexdiv w-full gap-2">
                <p className="w-full sm:text-base text-xs sm:tracking-widest tracking-wider truncate text-left">
                  {gameObj.map}
                </p>

                <img
                  className="sm:h-6 sm:w-6 sm:block hidden"
                  src={`images/mapTypes/${capitalizeFirstLetter(
                    gameObj.mapType
                  )}_icon.svg`}
                  alt="map type icon"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        gameObj &&
        (isUpdatingGame || isCreatingGame) && (
          <img
            className={`${imgHeight} w-full object-cover rounded-sm rounded-r-none`}
            src={`images/maps/${gameObj.mapImageUrl}`}
            alt=""
          />
        )
      )}

      {mapObj && !isUpdatingGame && !isCreatingGame ? (
        <div className="map_container flexdiv group">
          <img
            className={`${imgHeight} w-full object-cover rounded-sm rounded-r-none h-14`}
            src={`images/maps/${mapObj.imageUrl}`}
            alt=""
          />
          <div className="absolute flexdiv px-1 bg-mainText bg-opacity-40 sm:w-1/4 h-6  invisible group-hover:visible ">
            <p className="sm:text-base text-xs absolute truncate sm:tracking-widest tracking-wider text-secondaryText invisible group-hover:visible ">
              {mapObj.label}
            </p>
          </div>
        </div>
      ) : (
        mapObj &&
        (isUpdatingGame || isCreatingGame) && (
          <div className="relative">
            <img
              className={`${imgHeight} w-full object-cover rounded-sm rounded-r-none`}
              src={`images/maps/${mapObj.imageUrl}`}
              alt=""
            />
            <div className="flexdiv absolute  top-0 left-0 sm:px-1 px-0.5 bg-mainText w-full bg-opacity-40 sm:h-6 h-4">
              <p className=" text-activeColor sm:text-base text-xs truncate sm:tracking-widest tracking-wider">
                {mapObj.label}
              </p>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Map;
