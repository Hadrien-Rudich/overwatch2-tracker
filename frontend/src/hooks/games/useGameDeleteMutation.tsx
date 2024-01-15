import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { gameStore } from '../../store/gameStore';
import { deleteGameFromApi } from '../../services/API/games';
import type { GameData } from '../../types/store/gameTypes';

function useGameDeleteMutation({ gameObj }: { gameObj: GameData }) {
  const { deleteGame, unselectGame } = gameStore();

  const { mutate } = useMutation({
    mutationFn: () =>
      deleteGameFromApi(gameObj.userId, gameObj.profileId, gameObj.id),
    onSuccess: () => {
      toast.success('game deleted...', {
        position: 'bottom-right',
        theme: 'dark',
      });
      deleteGame(gameObj.id);
      unselectGame();
    },
    retry: 1,
  });

  return mutate;
}

export default useGameDeleteMutation;
