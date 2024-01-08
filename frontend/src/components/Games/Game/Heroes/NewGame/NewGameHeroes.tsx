import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import HeroesDropDown from './HeroesDropDown';
import Heroes from '../Heroes';
import ErrorToast from '../../../../ErrorToast';
import { gameStore } from '../../../../../store/gameStore';
import { gameDataStore } from '../../../../../store/gameDataStore';

function NewGameHeroes() {
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const { heroesData } = gameDataStore();
  const {
    selectedGameHeroes,
    heroesErrorToast,
    heroesErrorToastMessage,
    setHeroesErrorToast,
  } = gameStore();

  const toggleDropDown = () => {
    setHeroesErrorToast(false);
    setIsDropDownActive(!isDropDownActive);
  };

  return (
    <div className="NewGameHeroes_container relative flexdiv w-[90%] ">
      {heroesErrorToast && (
        <ErrorToast
          toastText={heroesErrorToastMessage}
          booleanProp={heroesErrorToast}
          widthProp="sm:w-[50%] w-[100%]"
          topProp="sm:top-[-2.1rem] top-[-1.55rem] "
          centeringProp=""
        />
      )}
      <div className="w-full bg-activeColor">
        {isDropDownActive ? (
          <HeroesDropDown toggleDropDown={toggleDropDown} />
        ) : (
          <div className="heroesImages_container flexdiv ">
            {selectedGameHeroes.length > 0 ? (
              <button
                className="flexdiv w-full relative ring-2 shadow-md rounded-sm"
                type="button"
                onClick={toggleDropDown}
              >
                {heroesData
                  .filter((hero) => selectedGameHeroes.includes(hero.slug))
                  .map((heroObj) => (
                    <div key={heroObj.label}>
                      <Heroes heroObj={heroObj} imgHeight="h-8" />
                    </div>
                  ))}
              </button>
            ) : (
              <button
                className="flexdiv w-full relative ring-2 h-8 shadow-md rounded-sm"
                type="button"
                onClick={toggleDropDown}
              >
                <div className="map_container flexdiv ">
                  <div className="flexdiv">
                    <p className="sm:text-lg text-base tracking-widest">
                      HEROES
                    </p>
                  </div>
                </div>
              </button>
            )}
            <MdOutlineKeyboardArrowDown className="absolute h-8 w-8 top-0 right-0 pointer-events-none lg:block hidden" />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewGameHeroes;
