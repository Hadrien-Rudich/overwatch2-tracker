// import { Request, Response, NextFunction } from 'express';
// import { allowedOrigins } from '../configuration/allowedOrigins';

// export const accessControl = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const origin = req.headers.origin || '';
//   if (allowedOrigins.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Content-Type, Accept, Authorization'
//     );
//     res.header(
//       'Access-Control-Allow-Methods',
//       'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//     );
//     res.header('Access-Control-Allow-Credentials', true as any);
//   }
//   // response to preflight request
//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200);
//   }
//   next();
// };

// export const accessControl = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE, PATCH, OPTIONS'
//   );
//   next();
// };
