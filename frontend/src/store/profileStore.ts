import { create } from 'zustand';
import type { ProfileStore, ProfileData } from '../types/store/profileTypes';

export const profileStore = create<ProfileStore>()((set) => ({
  profilesData: [],
  addProfilesData: (profilesOb) => set(() => ({ profilesData: profilesOb })),
  selectedProfile: { label: '' } as ProfileData,
  selectProfile: (profileObj) =>
    set(() => ({
      selectedProfile: profileObj,
    })),
  unselectProfile: () =>
    set(() => ({
      selectedProfile: {} as ProfileData,
    })),
  newProfile: '',
  setNewProfile: (profile) =>
    set(() => ({
      newProfile: profile,
    })),
  clearNewProfile: () =>
    set(() => ({
      newProfile: '',
    })),
  addNewProfile: (newProfileObj) =>
    set((state) => ({
      profilesData: [...state.profilesData, newProfileObj],
    })),
  updatedProfileLabel: '',

  setUpdatedProfileLabel: (label) =>
    set(() => ({
      updatedProfileLabel: label,
    })),

  clearUpdatedProfileLabel: () =>
    set(() => ({
      updatedProfileLabel: '',
    })),

  isUpdatingProfile: false,
  setIsUpdatingProfile: (boolean: boolean) =>
    set(() => ({
      isUpdatingProfile: boolean,
    })),

  updateProfileLabel(profileId, newProfileLabel) {
    set((state) => ({
      profilesData: state.profilesData.map((p) =>
        p.id === profileId ? { ...p, label: newProfileLabel } : p
      ),
    }));
  },
  isCreatingProfile: false,
  setIsCreatingProfile: (boolean: boolean) =>
    set(() => ({
      isCreatingProfile: boolean,
    })),
  deleteProfile: (profile) => {
    set((state) => ({
      profilesData: state.profilesData.filter((p) => p.label !== profile),
      profile: '',
    }));
  },
  reset: () => {
    set(() => ({
      profilesData: [],
      profile: '',
      newProfile: '',
    }));
  },
}));

export default profileStore;
