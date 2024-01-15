interface GameData {
  id: number;
  userId: number;
  profileId: number;
  result: string;
  map: string;
  mapType: string;
  mapImageUrl: string;
  heroes: string[];
  heroesImageUrl: string[];
  date: string;
}

interface GameStore {
  gamesData: GameData[] | [];
  addGamesData: (games: GameData[]) => void;

  removeGamesData: () => void;

  addGame: (game: GameData) => void;
  addMockGames: (mockGames: GameData[]) => void;
  updateGame: (gameId: number, updatedGameObj: GameData) => void;
  updateSelectedGame: (updatedProperties: Partial<GameData>) => void;
  deleteGame: (gameId: number) => void;
  selectGame: (game: GameData) => void;
  resetSelectedGame: (originalGameObj: GameData) => void;
  unselectGame: () => void;

  setIsUpdatingGame: (boolean: boolean) => void;
  setIsCreatingGame: (boolean: boolean) => void;

  selectedGame: GameData;
  isUpdatingGame: boolean;
  isCreatingGame: boolean;
  selectedGameMap: string;
  selectedGameMapType: string;
  selectedGameMapImage: string;
  selectedGameDate: Date;
  selectedGameResult: string;
  selectedGameCurrentResult: string;
  selectedGameDateInFormat: string;
  selectedGameHeroes: string[];
  selectedGameHeroesImages: string[];

  gameUpdateInProgress: boolean;
  currentMonth: number;
  selectGameMap: (map: string, mapImage: string) => void;
  selectGameMapType: (mapType: string) => void;
  clearSelectedGameMapType: () => void;

  selectGameHero: (hero: string, heroImage: string) => void;
  selectGameHeroes: (heroes: string[], heroesImages: string[]) => void;
  unselectGameHero: (hero: string, heroImage: string) => void;

  selectGameDate: (date: Date) => void;

  selectGameResult: (result: string) => void;
  selectGameCurrentResult: (result: string) => void;

  selectGameDateInFormat: (date: string) => void;

  setGameUpdateInProgress: (boolean: boolean) => void;

  setCurrentMonth: (month: number) => void;

  mapErrorToast: boolean;
  setMapErrorToast: (value: boolean) => void;
  mapErrorToastMessage: string;
  setMapErrorToastMessage: (value: string) => void;

  heroesErrorToast: boolean;
  setHeroesErrorToast: (value: boolean) => void;
  heroesErrorToastMessage: string;
  setHeroesErrorToastMessage: (value: string) => void;

  resultErrorToast: boolean;
  setResultErrorToast: (value: boolean) => void;
  resultErrorToastMessage: string;
  setResultErrorToastMessage: (value: string) => void;

  dateErrorToast: boolean;
  setDateErrorToast: (value: boolean) => void;
  dateErrorToastMessage: string;
  setDateErrorToastMessage: (value: string) => void;

  clearNewGame: () => void;
  reset: () => void;
}

export type { GameData, GameStore };
