interface ProfileData {
  id: number;
  userId: number;
  label: string;
}

interface ProfileStore {
  profilesData: ProfileData[] | [];
  addProfilesData: (profiles: ProfileData[]) => void;
  selectedProfile: ProfileData;
  selectProfile: (profileObj: ProfileData) => void;
  unselectProfile: () => void;
  newProfile: string;
  setNewProfile: (profile: string) => void;
  addNewProfile: (newProfileObj: ProfileData) => void;
  clearNewProfile: () => void;
  isUpdatingProfile: boolean;
  setIsUpdatingProfile: (boolean: boolean) => void;
  updatedProfileLabel: string;
  setUpdatedProfileLabel: (label: string) => void;
  clearUpdatedProfileLabel: () => void;
  updateProfileLabel: (profileId: number, newProfileLabel: string) => void;
  isCreatingProfile: boolean;
  setIsCreatingProfile: (boolean: boolean) => void;
  deleteProfile: (profile: string) => void;
  profileSavedToast: boolean;
  setProfileSavedToast: (value: boolean) => void;
  setProfileSavedToastMessage: (message: string) => void;
  profileSavedToastMessage: string;

  reset: () => void;
}

export type { ProfileData, ProfileStore };
