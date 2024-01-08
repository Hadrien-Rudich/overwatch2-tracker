import type { GameData } from '../types/store/gameTypes';
import type { ProfileData } from '../types/store/profileTypes';
import type { Result } from '../types/utilsTypes';

const getResultClassName = (gameResult: string, result: Result): string => {
  if (gameResult === result.label) {
    return `result bg-active${
      result.label.charAt(0).toUpperCase() + result.label.slice(1)
    }`;
  }
  if (gameResult !== result.label) {
    return 'hover:bg-activeColor hover:scale-105 hover:z-50';
  }
  return '';
};

const getResultClassNameFromGame = (game: GameData): string => {
  switch (game.result) {
    case 'win':
      return 'bg-activeWin';
    case 'loss':
      return 'bg-activeLoss';
    case 'draw':
      return 'bg-activeDraw';
    default:
      return '';
  }
};

const getResultClassNameFromResult = (result: string): string => {
  switch (result) {
    case 'win':
      return 'bg-activeWin';
    case 'loss':
      return 'bg-activeLoss';
    case 'draw':
      return 'bg-activeDraw';
    default:
      return '';
  }
};

const getGameContainerClassName = (
  game: GameData,
  selectedGame: GameData,
  isUpdatingGame: boolean,
  isCreatingGame: boolean
): string => {
  if (isCreatingGame) {
    return 'grayscale hover:cursor-default';
  }
  if (game.id === selectedGame.id) {
    return 'selected z-10';
  }
  if (!isUpdatingGame) {
    return 'unselected z-0';
  }
  return ' grayscale hover:cursor-default';
};

function getProfileCardClassName(
  p: ProfileData,
  selectedProfile: ProfileData,
  isUpdatingProfile: boolean,
  isCreatingProfile: boolean
) {
  if (isUpdatingProfile || isCreatingProfile) {
    return 'profilecard_container profile card disabled';
  }

  if (p.label === selectedProfile.label) {
    return 'profilecard_container profile card selected';
  }
  return 'profilecard_container profile card active ';
}

export {
  getResultClassName,
  getResultClassNameFromGame,
  getResultClassNameFromResult,
  getGameContainerClassName,
  getProfileCardClassName,
};
