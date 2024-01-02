import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../configuration/config';
import { InvalidTokenError, UserNotConnectedError } from '../models/error';
import { User } from '../models/user/user';

export interface AuthenticatedRequest extends Request {
  user: User.Base;
}

export async function authenticateToken(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    const cookieHeader = req.headers['cookie'];

    const token = extractTokenFromCookie(cookieHeader);

    if (token === undefined) {
      throw new UserNotConnectedError();
    }

    const user = await new Promise<User.Base>((resolve, reject) => {
      jwt.verify(token, config.accessToken, (err, user) => {
        if (err) {
          reject(new InvalidTokenError());
        } else {
          resolve(user as User.Base);
        }
      });
    });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

function extractTokenFromCookie(
  cookieHeader: string | undefined
): string | undefined {
  if (cookieHeader) {
    const cookies = cookieHeader.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'jwt') {
        return value;
      }
    }
  }
  return undefined;
}
