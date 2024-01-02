import cors, { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  origin: [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
    'http://localhost:3002',
    'http://127.0.0.1:3002',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization, Accept',
  // exposedHeaders: 'Access-Control-Allow-Origin',
  credentials: true,
};

export const corsMiddleware = cors(corsConfig);
