import { Router } from 'express';
import { mapController } from '../../../controllers/maps/mapController';

const mapRouter = Router();

mapRouter.get('/', mapController.getMaps);
mapRouter.get('/:type', mapController.getMapsWithType);
mapRouter.get('/:type/:slug', mapController.getMapWithSlug);

export default mapRouter;
