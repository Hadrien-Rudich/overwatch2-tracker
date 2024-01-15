import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { gameStore } from '../../store/gameStore';
import { profileStore } from '../../store/profileStore';
import { authStore } from '../../store/authStore';

import { addGameToApi, GameAddedToApi } from '../../services/API/games';

function useGameAddMutation() {
  const {
    selectedGameHeroes,
    selectedGameMap,
    selectedGameMapImage,
    selectedGameResult,
    selectedGameMapType,
    selectedGameHeroesImages,
    selectedGameDateInFormat,
    addGame,
  } = gameStore();

  const { userData } = authStore();
  const { selectedProfile } = profileStore();

  const { mutate } = useMutation({
    mutationFn: () =>
      addGameToApi(userData.id, selectedProfile.id, {
        result: selectedGameResult,
        map: selectedGameMap,
        mapType: selectedGameMapType,
        mapImageUrl: selectedGameMapImage,
        heroes: selectedGameHeroes,
        heroesImageUrl: selectedGameHeroesImages,
        date: selectedGameDateInFormat,
      }),

    onSuccess: (newGameAddedToApi: GameAddedToApi) => {
      addGame(newGameAddedToApi.game);
      toast.success('game created...', {
        position: 'bottom-right',
        theme: 'dark',
      });
    },
    retry: 1,
  });

  return mutate;
}

export default useGameAddMutation;
