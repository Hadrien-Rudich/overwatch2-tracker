import { create } from 'zustand';
import { ResetStore } from '../types/store/resetType';

import { gameStore } from './gameStore';
import { profileStore } from './profileStore';

export const resetStore = create<ResetStore>(() => ({
  resetAllStores: () => {
    gameStore.getState().reset();
    profileStore.getState().reset();
  },
}));

export default resetStore;
