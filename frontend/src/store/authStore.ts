import { create } from 'zustand';
import type { AuthStore, UserData } from '../types/store/authTypes';
import { resetStore } from './resetStore';

export const authStore = create<AuthStore>()((set) => ({
  userData: {} as UserData,
  isLoggedIn: false,
  setLoggedIn: () => set(() => ({ isLoggedIn: true })),
  setLoggedOut: () =>
    set(() => {
      resetStore.getState().resetAllStores();
      return {
        userData: {} as UserData,
        isLoggedIn: false,
        editAccount: false,
        editSecurity: false,
        newEmail: '',
        newPassword: '',
        confirmNewPassword: '',
        // newBattleTag: '',
        activeTab: 'details',
      };
    }),
  setUserData: (userData) => set(() => ({ userData })),
  updateUserData: (email: string) =>
    set((state) => ({ userData: { ...state.userData, email } })),
  editAccount: false,
  toggleEditAccount: () =>
    set((state) => ({ editAccount: !state.editAccount })),
  editSecurity: false,
  toggleEditSecurity: () =>
    set((state) => ({ editSecurity: !state.editSecurity })),
  newEmail: '',
  setNewEmail: (email) => set(() => ({ newEmail: email })),
  clearNewEmail: () => set(() => ({ newEmail: '' })),
  newPassword: '',
  setNewPassword: (password) => set(() => ({ newPassword: password })),
  clearNewPassword: () => set(() => ({ newPassword: '' })),
  confirmNewPassword: '',
  setConfirmNewPassword: (password) =>
    set(() => ({ confirmNewPassword: password })),
  clearConfirmNewPassword: () => set(() => ({ confirmNewPassword: '' })),

  activeTab: 'details',
  setActiveTab: (tab) =>
    set(() => ({ activeTab: tab, editAccount: false, editSecurity: false })),
  clearActiveTab: () => set(() => ({ activeTab: 'details' })),
}));

export default authStore;
