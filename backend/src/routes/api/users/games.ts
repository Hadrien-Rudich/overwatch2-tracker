import { Router } from 'express';
import { gameController } from '../../../controllers/users/gameController';
import { validateData } from '../../../services/dataValidation/validator';
import { GamesSchema } from '../../../services/dataValidation/schemas/game';

const gamesRouter = Router({ mergeParams: true });

gamesRouter
  .route('/')
  .get(gameController.getGames)
  .post(validateData(GamesSchema.create), gameController.createGame);

gamesRouter
  .route('/:gameId')
  .get(gameController.getGame)
  .patch(
    // validateData(GamesSchema.update),
    gameController.updateGame
  )
  .delete(gameController.deleteGame);

gamesRouter
  .route('/mock')
  .get(gameController.getGames)
  .post(gameController.createMockGames);

export default gamesRouter;
