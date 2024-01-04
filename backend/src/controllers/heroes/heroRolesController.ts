import { NextFunction, Request, Response } from 'express';
import { heroRoleMapper } from '../../data/dataMappers/heroes/heroRoleMapper';

export const heroRoleController = {
  async getHeroRoles(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const heroRoles = await heroRoleMapper.readHeroRoles();
      res.status(200).json(heroRoles);
    } catch (error) {
      next(error);
    }
  },
};
