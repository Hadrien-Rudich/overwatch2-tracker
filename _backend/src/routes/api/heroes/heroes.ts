import { Router } from 'express';
import { heroController } from '../../../controllers/heroes/heroController';

const heroRouter = Router();

heroRouter.get('/', heroController.getHeroes);
heroRouter.get('/:role', heroController.getHeroesWithRole);
heroRouter.get('/:role/:slug', heroController.getHeroWithSlug);

export default heroRouter;
