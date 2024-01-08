import { useState } from 'react';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { gameStore } from '../../../../../store/gameStore';
// import type { GameData } from '../../../../../types/store/gameTypes';
import Heroes from '../Heroes';
import { gameDataStore } from '../../../../../store/gameDataStore';
import ErrorToast from '../../../../ErrorToast';

interface HeroesDropDownProps {
  toggleDropDown: () => void;
}

function HeroesDropDown({ toggleDropDown }: HeroesDropDownProps) {
  const { selectedGameHeroes, selectGameHero, unselectGameHero } = gameStore();
  const { rolesData, heroesData } = gameDataStore();
  const [errorToast, setErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState('');

  const verifyHeroesArrayValidity = (heroesArray: string[]) => {
    if (heroesArray.length >= 0 && heroesArray.length <= 4) {
      return true;
    }
    setErrorToastMessage('Max 4 heroes');
    setErrorToast(true);
    setTimeout(() => {
      setErrorToast(false);
    }, 2000);
    return false;
  };

  const selectHero = (hero: string, heroImage: string) => {
    const heroInList = selectedGameHeroes.includes(hero);
    // The following line calculates heroesArrayHasValidLength based on the potential new state.
    const heroesArrayHasValidLength = verifyHeroesArrayValidity(
      heroInList
        ? selectedGameHeroes.filter((selectedHero) => selectedHero !== hero)
        : [...selectedGameHeroes, hero]
    );
    if (heroesArrayHasValidLength) {
      if (!heroInList) {
        selectGameHero(hero, heroImage);
      } else {
        unselectGameHero(hero, heroImage);
      }
    }
  };

  return (
    <div className="heroesImages_container absolute top-[-1rem] ring-2 ring-fourthColor bg-activeColor shadow-md rounded-sm">
      {errorToast && (
        <ErrorToast
          toastText={errorToastMessage}
          booleanProp={errorToast}
          widthProp="sm:w-[50%] w-[100%]"
          topProp="sm:top-[-2.15rem] top-[-1.6rem] "
          centeringProp="sm:left-[25%] sm:right-[25%] left-[0%] right-[0%]"
        />
      )}
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
        {selectedGameHeroes.length > 0 ? (
          <div className="currentHeroes_container flexdiv">
            {heroesData
              .filter((hero) => selectedGameHeroes.includes(hero.slug))
              .map((heroObj) => (
                <Heroes
                  key={(heroObj.id, heroObj.label)}
                  heroObj={heroObj}
                  imgHeight="h-8"
                />
              ))}
          </div>
        ) : (
          <div className="flexdiv h-8">
            <p className="sm:text-lg text-base tracking-widest">HEROES</p>
          </div>
        )}
      </div>
      <MdOutlineKeyboardArrowUp className="absolute h-8 w-8 top-0 right-0 pointer-events-none lg:block hidden" />
      <div className="heroesDropDown_container grid grid-cols-3 divide-x-2 divide-activeColor justify-center content-center bg-mainColor py-2">
        {rolesData.map((r) => (
          <div key={r.label} className="heroesByRoles_container">
            <div className="heroes_container flexdiv">
              <div className="flexdiv flex-wrap lg:gap-1 gap-[0.1rem]">
                {heroesData
                  .filter(
                    (hero) => hero.role.toLowerCase() === r.label.toLowerCase()
                  )
                  .map((h) => (
                    <div
                      className={`${
                        selectedGameHeroes.includes(h.slug)
                          ? 'ring-[0.1rem] ring-thirdColor '
                          : 'grayscale opacity-60 hover:scale-110 hover:grayscale-0 hover:opacity-100'
                      }    heroes_container bg-activeColor rounded-sm lg:h-8 sm:7 h-6 shadow-md`}
                      key={h.slug}
                    >
                      <button
                        type="button"
                        className="lg:h-8 sm:7 h-6"
                        onClick={() => selectHero(h.slug, h.imageUrl)}
                      >
                        <Heroes heroObj={h} imgHeight="lg:h-8 sm:7 h-6" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroesDropDown;
