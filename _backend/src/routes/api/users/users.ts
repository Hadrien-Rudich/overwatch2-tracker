import { Router } from 'express';
import { userController } from '../../../controllers/users/userController';
import { validateData } from '../../../services/dataValidation/validator';
import { UserSchema } from '../../../services/dataValidation/schemas/user';

const userRouter = Router();

userRouter.route('/').get(userController.getUsers);

userRouter
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser);

userRouter
  .route('/:id/details')
  .patch(validateData(UserSchema.update), userController.updateUserEmail);

userRouter
  .route('/:id/security')
  .patch(
    validateData(UserSchema.updatePassword),
    userController.updateUserPassword
  );

export default userRouter;
