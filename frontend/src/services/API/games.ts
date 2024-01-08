import type { GameData } from '../../types/store/gameTypes';
import {
  fetchDataFromApi,
  postDataToApi,
  patchDataOnApi,
  deleteDataFromApi,
} from './general';

export interface GameAddedToApi {
  message: string;
  game: {
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
  };
}

export interface MockGamesAddedToApi {
  message: string;
  games: {
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
  }[];
}

interface NewGame {
  result: string;
  map: string;
  mapType: string;
  mapImageUrl: string;
  heroes: string[];
  heroesImageUrl: string[];
  date: string;
}

interface GameDeletedFromApi {
  message: string;
  game: { id: number; userId: number; profileId: number };
}

export const fetchGamesFromApi = async (
  userId: number,
  profileId: number
): Promise<GameData[]> => {
  const endpoint = `user/${userId}/profiles/${profileId}/games`;
  return fetchDataFromApi(endpoint, 'GET');
};
export const addGameToApi = async (
  userId: number,
  profileId: number,
  gameObj: NewGame
): Promise<GameAddedToApi> => {
  const endpoint = `user/${userId}/profiles/${profileId}/games`;
  const response = await postDataToApi<GameAddedToApi>(endpoint, {
    userId,
    profileId,
    ...gameObj,
  });
  return {
    message: response.message,
    game: response.game,
  };
};

export const addMockGamesToApi = async (
  userId: number,
  profileId: number,
  gameObjArray: NewGame[]
): Promise<MockGamesAddedToApi> => {
  // Add userId and profileId to each game object in the array
  const gamesWithIds = gameObjArray.map((gameObj) => ({
    ...gameObj,
    userId,
    profileId,
  }));

  const endpoint = `user/${userId}/profiles/${profileId}/games/mock`;
  const response = await postDataToApi<MockGamesAddedToApi>(
    endpoint,
    gamesWithIds
  );
  return {
    message: response.message,
    games: response.games,
  };
};

interface GameUpdateForm {
  result: string;
  date: string;
  map: string;
  mapType: string;
  mapImageUrl: string;
  heroes: string[];
  heroesImageUrl: string[];
}

export const updateGameOnApi = async (
  userId: number,
  profileId: number,
  gameId: number,
  gameObj: GameUpdateForm
): Promise<GameAddedToApi> => {
  const endpoint = `user/${userId}/profiles/${profileId}/games/${gameId}`;
  const response = await patchDataOnApi<GameAddedToApi>(endpoint, {
    ...gameObj,
  });

  // console.log(response);
  return {
    message: response.message,
    game: response.game,
  };
};

export const deleteGameFromApi = async (
  userId: number,
  profileId: number,
  gameId: number
): Promise<void> => {
  const endpoint = `user/${userId}/profiles/${profileId}/games/${gameId}`;
  await deleteDataFromApi<GameDeletedFromApi>(endpoint, {
    gameId,
  });
};
