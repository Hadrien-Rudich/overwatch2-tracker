interface UserData {
  id: number;
  email: string;
  // battleTag: string;
  refreshToken: string;
}
interface UserCredentials {
  email: string;
  password: string;
}

interface AuthStore {
  userData: UserData;
  isLoggedIn: boolean;
  setLoggedIn: () => void;
  setLoggedOut: () => void;
  setUserData: (userData: UserData) => void;
  updateUserData: (email: string) => void;
  editAccount: boolean;
  toggleEditAccount: () => void;
  editSecurity: boolean;
  toggleEditSecurity: () => void;
  newEmail: string;
  setNewEmail: (email: string) => void;
  clearNewEmail: () => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  clearNewPassword: () => void;
  confirmNewPassword: string;
  setConfirmNewPassword: (password: string) => void;
  clearConfirmNewPassword: () => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;
  clearActiveTab: () => void;
}

export type { UserData, AuthStore, UserCredentials };
