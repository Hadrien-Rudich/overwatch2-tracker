import axios, { AxiosResponse, Method } from 'axios';
import type { UserData } from '../../types/store/authTypes';
import type { GameData } from '../../types/store/gameTypes';
import type { ProfileData } from '../../types/store/profileTypes';
import type {
  HeroData,
  MapData,
  MapTypeData,
  RoleData,
} from '../../types/store/gameDataTypes';

const api = axios.create({
  baseURL: 'http://localhost:3002/',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  return config;
});

const fetchDataFromApi = async <T>(
  endpoint: string,
  method: Method
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.request({
      url: endpoint,
      method,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const postDataToApi = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const patchDataOnApi = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.patch(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteDataFromApi = async <T>(
  endpoint: string,
  data: any
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.delete(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchHeroesFromApi = async (): Promise<HeroData[]> => {
  const endpoint = 'heroes';
  return fetchDataFromApi(endpoint, 'GET');
};

export const fetchRolesFromApi = async (): Promise<RoleData[]> => {
  const endpoint = 'heroroles';
  return fetchDataFromApi(endpoint, 'GET');
};

export const fetchMapsFromApi = async (): Promise<MapData[]> => {
  const endpoint = 'maps';
  return fetchDataFromApi(endpoint, 'GET');
};

export const fetchMapTypesFromApi = async (): Promise<MapTypeData[]> => {
  const endpoint = 'maptypes';
  return fetchDataFromApi(endpoint, 'GET');
};

interface UserVerified {
  accessToken: string;
  user: { id: number; email: string; battleTag: string; refreshToken: string };
}

export const logIn = async (
  email: string,
  password: string
): Promise<UserVerified> => {
  const endpoint = 'login';
  const response = await postDataToApi<UserVerified>(endpoint, {
    email,
    password,
  });
  return {
    accessToken: response.accessToken,
    user: response.user,
  };
};

interface NewUserCreated {
  message: string;
  user: {
    id: number;
    email: string;
    password: string;
    battleTag: string;
  };
}

export const register = async (
  email: string,
  password: string,
  battleTag: string
): Promise<boolean> => {
  const endpoint = 'register';
  try {
    const response: NewUserCreated = await postDataToApi(endpoint, {
      email,
      password,
      battleTag,
    });
    if (response.message === 'New User created') {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const logOut = async (): Promise<void> => {
  const endpoint = 'logout';
  await postDataToApi(endpoint, null);
};

export const fetchUserFromApi = async (userId: number): Promise<UserData> => {
  const endpoint = `user/${userId}`;
  return fetchDataFromApi(endpoint, 'GET');
};

export const fetchProfilesFromApi = async (
  userId: number
): Promise<ProfileData[]> => {
  const endpoint = `user/${userId}/profiles`;
  return fetchDataFromApi(endpoint, 'GET');
};

export interface ProfileAddedtoApi {
  message: string;
  profile: { id: number; userId: number; label: string };
}

export const addProfileToApi = async (
  userId: number,
  profile: string
): Promise<ProfileAddedtoApi> => {
  const endpoint = `user/${userId}/profiles`;
  const response = await postDataToApi<ProfileAddedtoApi>(endpoint, {
    label: profile,
  });
  return {
    message: response.message,
    profile: response.profile,
  };
};

export const updateProfileOnApi = async (
  userId: number,
  profileId: number,
  profile: string
): Promise<ProfileAddedtoApi> => {
  const endpoint = `user/${userId}/profiles/${profileId}`;
  const response = await patchDataOnApi<ProfileAddedtoApi>(endpoint, {
    label: profile,
  });
  return {
    message: response.message,
    profile: response.profile,
  };
};
interface ProfileDeletedFromApi {
  message: string;
  profile: { id: number; userId: number };
}

export const deleteProfileFromApi = async (
  userId: number,
  profileId: number
): Promise<void> => {
  const endpoint = `user/${userId}/profiles/${profileId}`;
  await deleteDataFromApi<ProfileDeletedFromApi>(endpoint, {
    id: profileId,
    userId,
  });
};

interface GameAddedToApi {
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

interface GameSubmitted {
  result: string;
  map: string;
  mapType: string;
  mapImageUrl: string;
  heroes: string[];
  heroesImageUrl: string[];
}

export const addGameToApi = async (
  userId: number,
  profileId: number,
  gameObj: GameSubmitted
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

export const fetchGamesFromApi = async (
  userId: number,
  profileId: number
): Promise<GameData[]> => {
  const endpoint = `user/${userId}/profiles/${profileId}/games`;
  return fetchDataFromApi(endpoint, 'GET');
};
