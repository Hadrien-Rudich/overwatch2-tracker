import dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: string;
  connectionString: string;
  accessToken: string;
  refreshToken: string;
  cookieToken: string;
}

export const config: Config = {
  port: process.env.PORT || '',
  connectionString: process.env.CONNECTION_STRING || '',
  accessToken: process.env.ACCESS_SECRET_TOKEN || '',
  refreshToken: process.env.REFRESH_SECRET_TOKEN || '',
  cookieToken: process.env.COOKIE_SECRET_TOKEN || '',
};
