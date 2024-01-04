import { useQuery } from '@tanstack/react-query';
import { fetchGamesFromApi } from '../../services/API/games';
import { gameStore } from '../../store/gameStore';
import { profileStore } from '../../store/profileStore';
import type { GameData } from '../../types/store/gameTypes';

export const useGamesQuery = () => {
  const { addGamesData } = gameStore();
  const { selectedProfile } = profileStore();
  const { removeGamesData } = gameStore();

  const { isLoading, isFetching, isError, isSuccess } = useQuery({
    queryKey: [`gamesData, profileId:${selectedProfile.id}`],
    queryFn: () =>
      fetchGamesFromApi(selectedProfile.userId, selectedProfile.id),
    onSuccess: (fetchedData: GameData[]) => {
      addGamesData(fetchedData);
    },
    onError: () => {
      removeGamesData();
    },
    retry: 1,
  });

  return { isLoading, isFetching, isError, isSuccess };
};

export default useGamesQuery;
