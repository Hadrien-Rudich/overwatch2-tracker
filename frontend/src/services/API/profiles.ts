import type { ProfileData } from '../../types/store/profileTypes';
import {
  fetchDataFromApi,
  postDataToApi,
  patchDataOnApi,
  deleteDataFromApi,
} from './general';

export const fetchProfilesFromApi = async (
  userId: number
): Promise<ProfileData[]> => {
  const endpoint = `user/${userId}/profiles`;
  return fetchDataFromApi(endpoint, 'GET');
};

export interface ProfileAddedtoApi {
  message: string;
  profile: { id: number; userId: number; label: string };
}

export const addProfileToApi = async (
  userId: number,
  profile: string
): Promise<ProfileAddedtoApi> => {
  const endpoint = `user/${userId}/profiles`;
  const response = await postDataToApi<ProfileAddedtoApi>(endpoint, {
    label: profile,
  });
  return {
    message: response.message,
    profile: response.profile,
  };
};

export const updateProfileOnApi = async (
  userId: number,
  profileId: number,
  profile: string
): Promise<ProfileAddedtoApi> => {
  const endpoint = `user/${userId}/profiles/${profileId}`;
  const response = await patchDataOnApi<ProfileAddedtoApi>(endpoint, {
    label: profile,
  });
  return {
    message: response.message,
    profile: response.profile,
  };
};
interface ProfileDeletedFromApi {
  message: string;
  profile: { id: number; userId: number };
}

export const deleteProfileFromApi = async (
  userId: number,
  profileId: number
): Promise<void> => {
  const endpoint = `user/${userId}/profiles/${profileId}`;
  await deleteDataFromApi<ProfileDeletedFromApi>(endpoint, {
    id: profileId,
    userId,
  });
};
