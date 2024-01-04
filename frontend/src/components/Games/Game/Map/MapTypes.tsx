import { MouseEvent } from 'react';
import { gameStore } from '../../../../store/gameStore';
import { gameDataStore } from '../../../../store/gameDataStore';

function MapTypes() {
  const { selectGameMapType, selectedGameMapType, clearSelectedGameMapType } =
    gameStore();

  const { mapTypesData } = gameDataStore();

  const handleMapTypeClick = (event: MouseEvent<HTMLButtonElement>) => {
    const mapTypeValue = event.currentTarget.value;

    if (selectedGameMapType === mapTypeValue) {
      clearSelectedGameMapType();
    } else {
      selectGameMapType(mapTypeValue);
    }
  };

  return (
    <div className="MapTypes_container flexdiv">
      <div className="flex justify-evenly rounded-sm">
        {mapTypesData.map((mtype) => (
          <div className="mapType_container" key={mtype.id}>
            <button
              type="button"
              onClick={handleMapTypeClick}
              value={mtype.label.toLowerCase()}
              className={`${
                selectedGameMapType === mtype.label.toLowerCase()
                  ? 'scale-105'
                  : 'opacity-30 hover:opacity-100 hover:scale-105'
              } flexdiv rounded-sm `}
            >
              <img
                className="sm:h-8 sm:w-20 h-4 w-8 drop-shadow-md"
                src={`images/mapTypes/${`${mtype.imageUrl.replace(
                  '.svg',
                  '_black.svg'
                )}`}`}
                alt="map type icon"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MapTypes;
