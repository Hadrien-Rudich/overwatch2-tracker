import { Request, Response, NextFunction } from 'express';
import type { Game } from '../../models/map/game';
import { gameMapper } from '../../data/dataMappers/users/gameMapper';

export const gameController = {
  async getAllGames(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const games = await gameMapper.readAllGames();
      res.status(200).json(games);
    } catch (error) {
      next(error);
    }
  },

  async getGames(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const profileId = Number(req.params.profileId);

      const userGames = await gameMapper.readGames(userId, profileId);
      res.status(200).json(userGames);
    } catch (error) {
      next(error);
    }
  },

  async getGame(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);

      const gameId = Number(req.params.gameId);
      const game = await gameMapper.readGame(userId, gameId);

      res
        .status(200)
        .json([{ message: `Game with id: ${gameId} found` }, { game: game }]);
    } catch (error) {
      next(error);
    }
  },

  async createGame(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const gameObj: Game.New = req.body;
      console.log('attempting to create gameobject');
      console.log(gameObj);
      const newGame = await gameMapper.createGame(gameObj);
      console.log('new game created see below');
      console.log(newGame);
      res.status(201).json({
        message: `Game created with id: ${newGame.id}`,
        game: newGame,
      });
    } catch (error) {
      next(error);
    }
  },

  async createMockGames(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const baseGames: Game.New[] = req.body;
      console.log('attempting to create base games');
      console.log(baseGames);

      const newGames = await gameMapper.createMockGames(baseGames);
      console.log('new games created, see below');
      console.log(newGames);

      res.status(201).json({
        message: `Games created with IDs: ${newGames
          .map((game) => game.id)
          .join(', ')}`,
        games: newGames,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateGame(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const profileId = Number(req.params.profileId);
      const gameId = Number(req.params.gameId);
      const gameObj: Game.Update = req.body;
      const updatedGame = await gameMapper.updateGame(
        userId,
        profileId,
        gameId,
        gameObj
      );

      res.status(200).json({
        message: `Game with id: ${updatedGame.id} updated`,
        game: updatedGame,
      });
    } catch (error) {
      console.log('error in updateGame');
      next(error);
    }
  },

  async deleteGame(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const gameId = Number(req.params.gameId);
      await gameMapper.deleteGame(gameId);
      res.status(200).json({ message: `Game with id: ${gameId} deleted` });
    } catch (error) {
      next(error);
    }
  },
};
