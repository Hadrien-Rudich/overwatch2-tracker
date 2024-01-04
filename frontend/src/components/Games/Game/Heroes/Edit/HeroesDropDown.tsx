import { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { gameStore } from '../../../../../store/gameStore';
import type { GameData } from '../../../../../types/store/gameTypes';
import Heroes from '../Heroes';
import { gameDataStore } from '../../../../../store/gameDataStore';
import ErrorToast from '../../../../ErrorToast';

interface HeroesDropDownProps {
  gameObj: GameData;
  toggleDropDown: () => void;
}

function HeroesDropDown({ gameObj, toggleDropDown }: HeroesDropDownProps) {
  const {
    selectedGame,
    selectedGameHeroes,
    selectGameHero,
    unselectGameHero,
    updateSelectedGame,
  } = gameStore();

  const { rolesData, heroesData } = gameDataStore();
  const [currentGame, setCurrentGame] = useState(gameObj);
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

  useEffect(() => {
    setCurrentGame((prevGame) => ({
      ...prevGame,
      heroes: selectedGameHeroes,
      heroesImageUrl: selectedGame.heroesImageUrl,
    }));
  }, [selectedGameHeroes, selectedGame.heroesImageUrl]);

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
        updateSelectedGame({
          ...selectedGame,
          heroes: [...selectedGame.heroes, hero],
          heroesImageUrl: [...selectedGame.heroesImageUrl, heroImage],
        });
      } else {
        const updatedSelectedHeroes = selectedGameHeroes.filter(
          (selectedHero) => selectedHero !== hero
        );
        const updatedSelectedHeroesImageUrl =
          selectedGame.heroesImageUrl.filter(
            (_, index) => selectedGameHeroes[index] !== hero
          );

        updateSelectedGame({
          ...selectedGame,
          heroes: updatedSelectedHeroes,
          heroesImageUrl: updatedSelectedHeroesImageUrl,
        });
        unselectGameHero(hero, heroImage);
      }
    }
  };

  return (
    <div className="heroesImages_container w-full ring-2 ring-thirdColor bg-activeColor absolute top-[-1rem] shadow-md">
      {errorToast && (
        <ErrorToast
          toastText={errorToastMessage}
          booleanProp={errorToast}
          widthProp="w-[100%]"
          topProp="sm:top-[-2rem] top-[-1.45rem]"
          centeringProp="left-[0%] right-[0%]"
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
        <div className="currentHeroes_container flexdiv ">
          <Heroes gameObj={currentGame} imgHeight="h-8" />
        </div>
      </div>
      <MdOutlineKeyboardArrowUp className="absolute h-8 w-8 top-0 right-0 pointer-events-none lg:block hidden" />

      <div className="heroesDropDown_container grid grid-cols-3 divide-x-2 divide-activeColor justify-center content-center bg-mainColor py-2">
        {rolesData.map((r) => (
          <div key={r.label} className="heroesByRoles_container">
            <div className="heroes_container flexdiv">
              <div className="flexdiv flex-wrap gap-1">
                {heroesData
                  .filter(
                    (hero) => hero.role.toLowerCase() === r.label.toLowerCase()
                  )
                  .map((h) => (
                    <div
                      className={`${
                        selectedGameHeroes.includes(h.slug)
                          ? 'ring ring-thirdColor shadow-md'
                          : 'hover:scale-110 '
                      }    heroes_container bg-activeColor rounded-sm h-9`}
                      key={h.slug}
                    >
                      <button
                        type="button"
                        className="h-6"
                        onClick={() => selectHero(h.slug, h.imageUrl)}
                      >
                        <Heroes heroObj={h} imgHeight="h-9" />
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
