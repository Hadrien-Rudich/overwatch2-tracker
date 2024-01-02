import { NextFunction, Request, Response } from 'express';
import type { Profile } from '../../models/user/profile';

import { profileMapper } from '../../data/dataMappers/users/profileMapper';

export const profileController = {
  async getAllProfiles(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const profiles = await profileMapper.readAllProfiles();
      res.status(200).json(profiles);
    } catch (error) {
      next(error);
    }
  },

  async getProfiles(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);

      const userProfiles = await profileMapper.readProfiles(userId);
      res.status(200).json(userProfiles);
    } catch (error) {
      next(error);
    }
  },

  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const profileId = Number(req.params.profileId);
      const profile = await profileMapper.readProfile(userId, profileId);

      res.status(200).json({
        message: `Profile with id: ${profileId} found`,
        profile: profile,
      });
    } catch (error) {
      next(error);
    }
  },

  async createProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const profileObj: Profile.New = req.body;
      const newProfile = await profileMapper.createProfile(userId, profileObj);
      res.status(201).json({
        message: `Profile created with id: ${newProfile.id}`,
        profile: newProfile,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const profileId = Number(req.params.profileId);
      const profileObj: Profile.Update = req.body;
      const updatedProfile = await profileMapper.updateProfile(
        profileId,
        profileObj
      );
      res
        .status(200)
        .json({ message: `Profile updated`, profile: updatedProfile });
    } catch (error) {
      next(error);
    }
  },

  async deleteProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const profileId = Number(req.params.profileId);
      await profileMapper.deleteProfile(userId, profileId);
      res
        .status(200)
        .json({ message: `Profile with id: ${profileId} deleted` });
    } catch (error) {
      next(error);
    }
  },
};
