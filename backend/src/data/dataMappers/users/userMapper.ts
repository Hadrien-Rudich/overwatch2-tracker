import { users } from './usersData';
import type { User } from '../../../models/user/user';
import { NotFoundError, InternalServerError } from '../../../models/error';
import { generateIncrementalId } from '../../../utils/functions';

export const userMapper = {
  async readUsers(): Promise<User.Base[]> {
    // to be edited with await and DB call
    if (users.length >= 1) {
      return users;
    } else {
      throw new InternalServerError('No Users found');
    }
  },

  async readUser(userId: number): Promise<User.Base> {
    // to be edited with await and DB call
    const user = users.find((user) => user.id === userId);
    if (user) {
      return user;
    } else {
      throw new NotFoundError(`User with id: ${userId} not found`);
    }
  },

  async checkEmail(email: string): Promise<Boolean> {
    // to be edited with await and DB call
    const emailInUse = users.find((user) => user.email === email);
    return !!emailInUse;
  },

  async readUserWithEmail(email: string): Promise<User.Base> {
    // to be edited with await and DB call
    const user = users.find((user) => user.email === email);
    if (user) {
      return user;
    } else {
      throw new NotFoundError(`User with email: ${email} not found`);
    }
  },

  async readUserWithRefreshToken(refreshToken: string): Promise<User.Base> {
    // to be edited with await and DB call
    const user = users.find((user) => user.refresh_token === refreshToken);
    if (user) {
      return user;
    } else {
      throw new NotFoundError(
        `User with Refresh Token: ${refreshToken} not found`
      );
    }
  },

  async createUser(userObj: User.New): Promise<User.Base> {
    // to be edited with await and DB call
    const newAccount = { ...userObj, id: generateIncrementalId(users) };
    users.push(newAccount);
    return newAccount;
  },

  async updateUserEmail(
    userId: number,
    userObj: User.Update
  ): Promise<User.Base> {
    // to be edited with await and DB call
    const indexOfAccountToUpdate = users.findIndex(
      (user) => user.id === userId
    );

    if (indexOfAccountToUpdate !== -1) {
      const updatedUser = { ...users[indexOfAccountToUpdate], ...userObj };
      users[indexOfAccountToUpdate] = updatedUser;
      return updatedUser;
    } else {
      throw new NotFoundError(`User with id: ${userId} not found`);
    }
  },

  async updateRefreshToken(
    userId: number,
    refreshToken: string
  ): Promise<User.Base> {
    // to be edited with await and DB call
    const indexOfAccountToUpdate = users.findIndex(
      (user) => user.id === userId
    );

    if (indexOfAccountToUpdate !== -1) {
      const updatedUser = {
        ...users[indexOfAccountToUpdate],
        refresh_token: refreshToken,
      };
      users[indexOfAccountToUpdate] = updatedUser;
      return updatedUser;
    } else {
      throw new NotFoundError(`User with id: ${userId} not found`);
    }
  },

  async updateUserPassword(
    userId: number,
    userObj: User.UpdatePassword
  ): Promise<User.Base> {
    // to be edited with await and DB call
    const indexOfAccountToUpdate = users.findIndex(
      (user) => user.id === userId
    );

    if (indexOfAccountToUpdate !== -1) {
      const updatedUser = {
        ...users[indexOfAccountToUpdate],
        password: userObj.newPassword,
      };
      users[indexOfAccountToUpdate] = updatedUser;
      return updatedUser;
    } else {
      throw new NotFoundError(`User with id: ${userId} not found`);
    }
  },

  async deleteUser(userId: number): Promise<User.Base[]> {
    // to be edited with await and DB call
    const indexOfAccountToDelete = users.findIndex(
      (user) => user.id === userId
    );
    if (indexOfAccountToDelete !== -1) {
      // to be edited with await and DB call
      users.splice(indexOfAccountToDelete, 1);
    } else {
      throw new NotFoundError(`User with id: ${userId} not found`);
    }
    return users;
  },
};
