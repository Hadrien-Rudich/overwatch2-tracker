import Joi from 'joi';
import type { User } from '../../../models/user/user';
export const UserSchema = {
  login: Joi.object<User.Login>({
    email: Joi.string().email().required(),

    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,}$/
      )
      .required()
      .messages({
        'string.pattern.base': `{{#label}} must meet the following format: 1 uppercase, 1 lowercase,1 digit, 1 special char, 8 chars min, 25 chars max`,
      }),
  }),

  register: Joi.object<User.New>({
    email: Joi.string().email().required(),
    // battleTag: Joi.string()
    //   .pattern(/^(?=.*[#])[A-Za-z\d#]{3,20}$/)
    //   .required()
    //   .messages({
    //     'string.pattern.base': `{{#label}} must meet the following format: 1 #, 1 letter, 1 digit, 3 chars min, 20 chars max`,
    //   }),

    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,25}$/
      )
      .required()
      .messages({
        'string.pattern.base': `{{#label}} must meet the following format: 1 uppercase, 1 lowercase,1 digit, 1 special char, 8 char min, 25 char max`,
      }),
  }),
  update: Joi.object<User.Update>({
    id: Joi.number(),
    email: Joi.string().email(),
    // battleTag: Joi.string()
    //   .pattern(/^(?=.*[#])[A-Za-z\d#]{3,20}$/)
    //   .messages({
    //     'string.pattern.base': `{{#label}} must meet the following format: 1 #, 1 letter, 1 digit, 3 chars min, 20 chars max`,
    //   }),
  }),

  updatePassword: Joi.object<User.UpdatePassword>({
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,25}$/
      )
      .required()
      .messages({
        'string.pattern.base': `{{#label}} must meet the following format: 1 uppercase, 1 lowercase,1 digit, 1 special char, 8 char min, 25 char max`,
      }),
    newPassword: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,25}$/
      )
      .required()
      .messages({
        'string.pattern.base': `{{#label}} must meet the following format: 1 uppercase, 1 lowercase,1 digit, 1 special char, 8 char min, 25 char max`,
      }),
  }),
};
