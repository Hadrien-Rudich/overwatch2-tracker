import { Router } from 'express';
import { apiRouter } from './api';
import invalidUrlHandler from '../middlewares/invalidUrlHandler';
const router = Router();

router.use('/', apiRouter);
router.use(invalidUrlHandler);

export default router;
