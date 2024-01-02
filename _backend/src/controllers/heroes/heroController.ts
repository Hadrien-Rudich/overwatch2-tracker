import { Request, Response, NextFunction } from 'express';
import { heroMapper } from '../../data/dataMappers/heroes/heroMapper';

type RequestParams = { slug: string; role: string };

export const heroController = {
  async getHeroes(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const heroes = await heroMapper.readHeroes();
      res.status(200).json(heroes);
    } catch (error) {
      next(error);
    }
  },

  async getHeroWithSlug(
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const heroWithSlug = await heroMapper.readWithSlug(slug);
      res.status(200).json(heroWithSlug);
    } catch (error) {
      next(error);
    }
  },

  async getHeroesWithRole(
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { role } = req.params;
      const heroesWithRole = await heroMapper.readWithRole(role);

      if (heroesWithRole) {
        res.status(200).json(heroesWithRole);
      }
    } catch (error) {
      next(error);
    }
  },
};
