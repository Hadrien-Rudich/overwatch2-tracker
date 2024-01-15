import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { gameStore } from '../../store/gameStore';
import type { GameData } from '../../types/store/gameTypes';
import { updateGameOnApi, GameAddedToApi } from '../../services/API/games';

function useGameUpdateMutation({ gameObj }: { gameObj: GameData }) {
  const {
    selectedGameResult,
    selectedGameMap,
    selectedGameMapImage,
    selectedGameDateInFormat,
    selectedGameHeroes,
    selectedGameHeroesImages,
    setIsUpdatingGame,
    updateGame,
  } = gameStore();

  const { mutate } = useMutation({
    mutationFn: () =>
      updateGameOnApi(gameObj.userId, gameObj.profileId, gameObj.id, {
        ...gameObj,
        result: selectedGameResult,
        date: selectedGameDateInFormat,
        map: selectedGameMap,
        mapImageUrl: selectedGameMapImage,
        heroes: selectedGameHeroes,
        heroesImageUrl: selectedGameHeroesImages,
      }),
    onSuccess: (UpdatedGameOnApi: GameAddedToApi) => {
      toast.success('game updated...', {
        position: 'bottom-right',
        theme: 'dark',
      });
      setIsUpdatingGame(false);

      updateGame(UpdatedGameOnApi.game.id, UpdatedGameOnApi.game);
    },
    retry: 1,
  });

  return mutate;
}

export default useGameUpdateMutation;
