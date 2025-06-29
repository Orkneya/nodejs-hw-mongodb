import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUsersSchema, registerUsersSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refrashUserSessionController,
  registerUserController,
} from '../controllers/auth.js';

const router = Router();
router.post(
  '/register',
  validateBody(registerUsersSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUsersSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refrashUserSessionController));

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
