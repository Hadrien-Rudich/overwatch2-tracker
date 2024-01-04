import { Request, Response, NextFunction } from 'express';
import { userMapper } from '../../data/dataMappers/users/userMapper';
import { comparePasswords } from '../../services/passwordHash';
import { InvalidCredentialsError } from '../../models/error';
import { User } from '../../models/user/user';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../services/authentication/tokenGen';
import { cookieOptions } from '../../configuration/cookieOptions';

export const authController = {
  async logIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password }: User.Login = req.body;

      const user = await userMapper.readUserWithEmail(email);
      const passwordMatch = await comparePasswords(password, user.password);
      if (passwordMatch) {
        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        await userMapper.updateRefreshToken(user.id, refreshToken);
        res.cookie('jwt', refreshToken, cookieOptions);
        delete user.refresh_token;

        res.status(200).json({
          user,
          accessToken,
          // message: 'Login successful',
        });
      } else {
        throw new InvalidCredentialsError();
      }
    } catch (error) {
      next(error);
    }
  },

  async logOut(req: Request, res: Response): Promise<void> {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      res.sendStatus(204);
    }

    const refreshToken: string = cookies.jwt;

    const user = await userMapper.readUserWithRefreshToken(refreshToken);

    if (!user) {
      res.clearCookie('jwt', cookieOptions);
      res.sendStatus(204);
    }
    const emptiedRefreshToken = '';
    await userMapper.updateRefreshToken(user.id, emptiedRefreshToken);
    res.clearCookie('jwt', cookieOptions);
    res.sendStatus(204);
  },
};
