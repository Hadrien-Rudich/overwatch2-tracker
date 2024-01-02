import { Request, Response, NextFunction } from 'express';
import { mapTypeMapper } from '../../data/dataMappers/maps/mapTypeMapper';
export const mapTypeController = {
  async getMapTypes(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mapTypes = await mapTypeMapper.readMapTypes();
      res.status(200).json(mapTypes);
    } catch (error) {
      next(error);
    }
  },
};
