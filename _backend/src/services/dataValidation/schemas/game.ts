import Joi from 'joi';
import { Game } from '../../../models/map/game';
export const GamesSchema = {
  create: Joi.object<Game.New>({
    userId: Joi.number().required(),
    profileId: Joi.number().required(),
    result: Joi.string().required(),
    map: Joi.string().required(),
    mapType: Joi.string().required(),
    mapImageUrl: Joi.string().required(),
    heroes: Joi.array().items(Joi.string()).required(),
    heroesImageUrl: Joi.array().items(Joi.string()).required(),
    date: Joi.string().required(),
  }),

  update: Joi.object<Game.Update>({
    id: Joi.number(),
    userId: Joi.number(),
    profileId: Joi.string(),
    result: Joi.string(),
    map: Joi.string(),
    mapType: Joi.string(),
    mapImageUrl: Joi.string(),
    heroes: Joi.array().items(Joi.string()),
    heroesImageUrl: Joi.array().items(Joi.string()),
    date: Joi.string(),
  }),
};
