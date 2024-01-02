import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
export const validateData = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      const errorMessage = (error as Error).message;
      return res.status(400).json({ error: errorMessage });
    }
  };
};
