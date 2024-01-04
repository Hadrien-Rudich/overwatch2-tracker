import { useQueries } from '@tanstack/react-query';
import {
  fetchMapsFromApi,
  fetchMapTypesFromApi,
} from '../../services/API/gameReport';
import { gameDataStore } from '../../store/gameDataStore';

import type { MapData, MapTypeData } from '../../types/store/gameDataTypes';

export const useMapsQueries = () => {
  const { addMapsData, addMapTypesData } = gameDataStore();

  useQueries({
    queries: [
      {
        queryKey: ['mapsData'],
        queryFn: fetchMapsFromApi,
        onSuccess: (fetchedData: MapData[]) => {
          addMapsData(fetchedData);
        },
        staleTime: 1000 * 60 * 60 * 24 * 30,
        cacheTime: 1000 * 60 * 60 * 24 * 30 * 30,
      },

      {
        queryKey: ['mapTypesData'],
        queryFn: fetchMapTypesFromApi,
        onSuccess: (fetchedData: MapTypeData[]) => {
          addMapTypesData(fetchedData);
        },
        staleTime: 1000 * 60 * 60 * 24 * 30,
        cacheTime: 1000 * 60 * 60 * 24 * 30 * 30,
      },
    ],
  });
};

export default useMapsQueries;
