import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { gameStore } from '../../store/gameStore';
import { profileStore } from '../../store/profileStore';
import { authStore } from '../../store/authStore';
import mockGames from '../../utils/mockGamesUtils';

import {
  addMockGamesToApi,
  MockGamesAddedToApi,
} from '../../services/API/games';

function useMockGameAddMutation() {
  const { addMockGames } = gameStore();

  const { userData } = authStore();
  const { selectedProfile } = profileStore();

  const { mutate } = useMutation({
    mutationFn: () =>
      addMockGamesToApi(userData.id, selectedProfile.id, mockGames),
    onSuccess: (newGamesAddedToApi: MockGamesAddedToApi) => {
      toast.success('mock games created...', {
        position: 'bottom-right',
        theme: 'dark',
      });
      addMockGames(newGamesAddedToApi.games);
    },
    retry: 1,
  });

  return mutate;
}

export default useMockGameAddMutation;
