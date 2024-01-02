import { useMutation } from '@tanstack/react-query';
import { gameStore } from '../../store/gameStore';
import { deleteGameFromApi } from '../../services/API/games';
import type { GameData } from '../../types/store/gameTypes';

function useGameDeleteMutation({ gameObj }: { gameObj: GameData }) {
  const {
    deleteGame,
    unselectGame,
    setGameSavedToast,
    setGameSavedToastMessage,
  } = gameStore();

  const { mutate } = useMutation({
    mutationFn: () =>
      deleteGameFromApi(gameObj.userId, gameObj.profileId, gameObj.id),
    onSuccess: () => {
      setGameSavedToastMessage('Game deleted...');
      setGameSavedToast(true);
      deleteGame(gameObj.id);
      unselectGame();
    },
    retry: 1,
  });

  return mutate;
}

export default useGameDeleteMutation;
