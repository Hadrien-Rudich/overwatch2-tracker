import Joi from 'joi';
import { Profile } from '../../../models/user/profile';
export const ProfileSchema = {
  create: Joi.object<Profile.New>({
    label: Joi.string()
      .pattern(/^[\s\S]{3,20}$/)
      .required()
      .messages({
        'string.pattern.base': `{{#label}} must meet the following format: 3 chars min, 20 chars max`,
      }),
  }),

  update: Joi.object<Profile.Update>({
    label: Joi.string()
      .pattern(/^[\s\S]{3,20}$/)
      .required()
      .messages({
        'string.pattern.base': `{{#label}} must meet the following format: 3 chars min, 20 chars max`,
      }),
  }),
};
