import { profiles } from './profilesData';
import type { Profile } from '../../../models/user/profile';
import {
  BadRequestError,
  NotFoundError,
  InternalServerError,
  ProfileAlreadyExists,
} from '../../../models/error';
import { generateIncrementalId } from '../../../utils/functions';

export const profileMapper = {
  async readAllProfiles(): Promise<Profile.Base[]> {
    // to be edited with await and DB call
    if (profiles.length >= 1) {
      return profiles;
    } else {
      throw new InternalServerError('No Profiles found');
    }
  },

  async readProfiles(userId: number): Promise<Profile.Base[]> {
    // to be edited with await and DB call
    const userProfiles = profiles.filter(
      (profile) => profile.userId === userId
    );

    if (userProfiles.length >= 1) {
      return userProfiles;
    } else {
      throw new InternalServerError('No Profiles found');
    }
  },

  async readProfile(userId: number, profileId: number): Promise<Profile.Base> {
    // to be edited with await and DB call
    const profile = profiles.find(
      (profile) => profile.id === profileId && profile.userId === userId
    );
    if (profile) {
      return profile;
    } else {
      throw new NotFoundError(`Profile with id: ${profileId} not found`);
    }
  },

  async createProfile(
    userId: number,
    profileObj: Profile.New
  ): Promise<Profile.Base> {
    if (!profileObj) {
      throw new BadRequestError('Invalid Profile Object.');
    } else {
      // to be edited with await and DB call
      const newProfile = {
        ...profileObj,
        id: generateIncrementalId(profiles),
        userId,
      };
      profiles.push(newProfile);
      return newProfile;
    }
  },

  async updateProfile(
    profileId: number,
    profileObj: Profile.Update
  ): Promise<Profile.Base> {
    // to be edited with await and DB call
    // if (profiles.some((profile) => profile.label === profileObj.label)) {
    //   throw new ProfileAlreadyExists('Profile already exists');
    // }

    if (!profileId) {
      throw new BadRequestError('Invalid format: no ID provided');
    }

    const indexOfProfileToUpdate = profiles.findIndex(
      (profile) => profile.id === profileId
    );

    if (!profileObj) {
      throw new BadRequestError('Invalid format: Profile Label missing');
    }

    if (indexOfProfileToUpdate !== -1) {
      const updatedProfile = {
        ...profiles[indexOfProfileToUpdate],
        label: profileObj.label,
      };
      profiles[indexOfProfileToUpdate] = updatedProfile;
      return updatedProfile;
    } else {
      throw new NotFoundError(`Profile with id: ${profileId} not found`);
    }
  },

  async deleteProfile(
    userId: number,
    profileId: number
  ): Promise<Profile.Base[]> {
    // to be edited with await and DB call
    const indexOfProfileToDelete = profiles.findIndex(
      (profile) => profile.id === profileId && profile.userId === userId
    );

    if (indexOfProfileToDelete !== -1) {
      profiles.splice(indexOfProfileToDelete, 1);
    } else {
      throw new NotFoundError(`Profile with id: ${profileId} was not found`);
    }
    return profiles;
  },
};
