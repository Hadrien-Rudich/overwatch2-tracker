import type { UserData } from '../../types/store/authTypes';
import { postDataToApi, fetchDataFromApi, patchDataOnApi } from './general';

export interface UserVerified {
  accessToken: string;
  user: {
    id: number;
    email: string;
    // battleTag: string;
    refreshToken: string;
  };
}

export const logIn = async (
  email: string,
  password: string
): Promise<UserVerified> => {
  const endpoint = 'login';
  const response = await postDataToApi<UserVerified>(endpoint, {
    email,
    password,
  });
  return {
    accessToken: response.accessToken,
    user: response.user,
  };
};

interface NewUserCreated {
  message: string;
  user: {
    id: number;
    email: string;
    password: string;
    // battleTag: string;
  };
}

// export const register = async (
//   email: string,
//   password: string,
//   battleTag: string
// ): Promise<boolean> => {
//   const endpoint = 'register';
//   try {
//     const response: NewUserCreated = await postDataToApi(endpoint, {
//       email,
//       password,
//       battleTag,
//     });
//     if (response.message === 'New User created') {
//       return true;
//     }

//     return false;
//   } catch (error) {
//     return false;
//   }
// };

export const register = async (
  email: string,
  password: string
  // battleTag: string
): Promise<{ success: boolean; message: string }> => {
  const endpoint = 'register';
  try {
    const response: NewUserCreated = await postDataToApi(endpoint, {
      email,
      password,
      // battleTag,
    });
    if (response.message === 'New User created') {
      return { success: true, message: 'New User created' };
    }

    if (response.message === 'Email is already in use') {
      return { success: false, message: 'Email is already in use' };
    }

    return { success: false, message: 'Unexpected error' };
  } catch (error) {
    return { success: false, message: 'Unexpected error' };
  }
};

export const updateUserEmail = async (
  userId: number,
  newEmail: string
): Promise<UserData> => {
  const endpoint = `user/${userId}/details`;
  return patchDataOnApi(endpoint, { id: userId, email: newEmail });
};

export const logOut = async (): Promise<void> => {
  const endpoint = 'logout';
  await postDataToApi(endpoint, null);
};

export const fetchUserFromApi = async (userId: number): Promise<UserData> => {
  const endpoint = `user/${userId}`;
  return fetchDataFromApi(endpoint, 'GET');
};
