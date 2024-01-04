import { fetchDataFromApi } from './general';
import type {
  HeroData,
  MapData,
  MapTypeData,
  RoleData,
} from '../../types/store/gameDataTypes';

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
