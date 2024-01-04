import { config } from '../../configuration/config';
import { User } from '../../models/user/user';
import jwt from 'jsonwebtoken';

export async function generateAccessToken(user: User.Base) {
  return jwt.sign(user, config.accessToken, { expiresIn: '5m' });
}

export async function generateRefreshToken(user: User.Base) {
  return jwt.sign(user, config.refreshToken, { expiresIn: '1d' });
}
