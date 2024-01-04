import { Request, Response, NextFunction } from 'express';
import { mapMapper } from '../../data/dataMappers/maps/mapMapper';

type RequestParams = { slug: string; type: string };

export const mapController = {
  async getMaps(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const maps = await mapMapper.readMaps();
      res.status(200).json(maps);
    } catch (error) {
      next(error);
    }
  },

  async getMapWithSlug(
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const mapWithSlug = await mapMapper.readWithSlug(slug);
      res.status(200).json(mapWithSlug);
    } catch (error) {
      next(error);
    }
  },

  async getMapsWithType(
    req: Request<RequestParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { type } = req.params;
      const mapsWithType = await mapMapper.readWithType(type);

      if (mapsWithType) {
        res.status(200).json(mapsWithType);
      }
    } catch (error) {
      next(error);
    }
  },
};
