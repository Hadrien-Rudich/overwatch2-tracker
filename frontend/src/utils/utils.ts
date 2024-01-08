import type { GameData } from '../types/store/gameTypes';
import type { MapData } from '../types/store/gameDataTypes';
import type {
  Month,
  // Outcome
} from '../types/utilsTypes';
import type { ProfileData } from '../types/store/profileTypes';

const months: Month[] = [
  { label: 'all', index: 0 },
  { label: 'January', index: 1 },
  { label: 'February', index: 2 },
  { label: 'March', index: 3 },
  { label: 'April', index: 4 },
  { label: 'May', index: 5 },
  { label: 'June', index: 6 },
  { label: 'July', index: 7 },
  { label: 'August', index: 8 },
  { label: 'September', index: 9 },
  { label: 'October', index: 10 },
  { label: 'November', index: 11 },
  { label: 'December', index: 12 },
];

const filterGames = (
  gameData: GameData[],
  heroesFilter: string[],
  mapsFilter: string[],
  resultsFilter: string[]
) => {
  // console.log(gameData);
  // Sort the gameData array by date in ascending order
  const sortedGameData = gameData.slice().sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('/'));
    const dateB = new Date(b.date.split('/').reverse().join('/'));
    return dateA.getTime() - dateB.getTime();
  });

  // console.log(sortedGameData);

  if (
    heroesFilter.length === 0 &&
    mapsFilter.length === 0 &&
    resultsFilter.length === 0
  ) {
    // No filters applied, return sorted original gameData
    return sortedGameData;
  }

  const heroesFilteredGames =
    heroesFilter.length > 0
      ? sortedGameData.filter((game) =>
          game.heroes.some((hero) => heroesFilter.includes(hero))
        )
      : sortedGameData;

  const mapsFilteredGames =
    mapsFilter.length > 0
      ? heroesFilteredGames.filter((game) => mapsFilter.includes(game.map))
      : heroesFilteredGames;

  const resultsFilteredGames =
    resultsFilter.length > 0
      ? mapsFilteredGames.filter((game) => resultsFilter.includes(game.result))
      : mapsFilteredGames;

  return resultsFilteredGames;
};

const filterGamesByMonth = (
  month: number,
  gameData: GameData[]
): GameData[] => {
  if (Number(month) === 0) {
    return gameData;
  }
  return gameData.filter(
    (game) => Number(game.date.slice(3, 5)) === Number(month)
  );
};

const filterMapTypes = (mapsData: MapData[], mapType: string): MapData[] => {
  const result = mapsData.filter((map) => map.type === mapType);
  return result;
};

const formatDateForGameEdit = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
};

const dateNowInGameFormat = (): string => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

const convertDateToDatePickerFormat = (date: string): Date => {
  const [day, month] = date.split('/');
  return new Date(
    new Date().getFullYear(),
    parseInt(month, 10) - 1,
    parseInt(day, 10)
  );
};

const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const verifyProfileLabelAvailability = (
  newProfileLabel: string,
  profilesData: ProfileData[]
): void => {
  if (newProfileLabel === '') {
    throw new Error('Name cannot be empty');
  }

  if (profilesData.some((profile) => profile.label === newProfileLabel)) {
    throw new Error('Name is unavailable');
  }
  // No errors, continue with your logic.
};

export {
  filterGamesByMonth,
  filterGames,
  filterMapTypes,
  formatDateForGameEdit,
  convertDateToDatePickerFormat,
  dateNowInGameFormat,
  capitalizeFirstLetter,
  verifyProfileLabelAvailability,
  months,
};
