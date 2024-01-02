import { games } from './gamesData';
import { Game } from '../../../models/map/game';
import { generateIncrementalId } from '../../../utils/functions';
import { NotFoundError, InternalServerError } from '../../../models/error';

export const gameMapper = {
  async readAllGames(): Promise<Game.Base[]> {
    // to be edited with await and DB call
    if (games.length >= 1) {
      return games;
    } else {
      throw new InternalServerError('No Games found');
    }
  },

  async readGames(userId: number, profileId: number): Promise<Game.Base[]> {
    // to be edited with await and DB call
    const userGames = games.filter(
      (game) => game.userId === userId && game.profileId === profileId
    );

    if (userGames.length >= 1) {
      return userGames;
    } else {
      throw new InternalServerError('No Games found');
    }
  },

  async readGame(userId: number, gameId: number): Promise<Game.Base> {
    // to be edited with await and DB call
    const game = games.find(
      (game) => game.id === gameId && game.userId === userId
    );
    if (game) {
      return game;
    } else {
      throw new NotFoundError(`Profile with id: ${gameId} not found`);
    }
  },

  async createGame(gameObj: Game.New): Promise<Game.Base> {
    // to be edited with await and DB call
    const newGame = {
      ...gameObj,
      id: generateIncrementalId(games),
    };
    games.push(newGame);
    return newGame;
  },

  async createMockGames(gameObjects: Game.New[]): Promise<Game.Base[]> {
    const mockGames: Game.Base[] = [];

    // to be edited with await and DB call
    for (const gameObj of gameObjects) {
      const newGame = {
        ...gameObj,
        id: generateIncrementalId(games),
      };
      games.push(newGame);
      mockGames.push(newGame);
    }

    return mockGames;
  },

  async updateGame(
    userId: number,
    profileId: number,
    gameId: number,
    gameObj: Game.Update
  ): Promise<Game.Base> {
    // to be edited with await and DB call

    const indexOfGameToUpdate = games.findIndex(
      (game) =>
        game.id === gameId &&
        game.userId === userId &&
        game.profileId === profileId
    );

    if (indexOfGameToUpdate !== -1) {
      const updatedGame = { ...games[indexOfGameToUpdate], ...gameObj };
      games[indexOfGameToUpdate] = updatedGame;
      return updatedGame;
    } else {
      throw new NotFoundError(`Game with id: ${gameId} not found`);
    }
  },

  async deleteGame(gameId: number): Promise<Game.Base[]> {
    // to be edited with await and DB call
    const indexOfGameToDelete = games.findIndex((game) => game.id === gameId);
    if (indexOfGameToDelete !== -1) {
      // to be edited with await and DB call
      games.splice(indexOfGameToDelete, 1);
    } else {
      throw new NotFoundError(`Game with id: ${gameId} not found`);
    }
    return games;
  },
};
