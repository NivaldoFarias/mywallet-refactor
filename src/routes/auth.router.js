import express from 'express';

import * as controller from './../controllers/auth.controller.js';
import * as middleware from './../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post(
  'sign-up',
  middleware.validateSignUp,
  middleware.emailIsUnique,
  controller.signUp,
);
authRouter.post(
  'sign-in',
  middleware.validateSignIn,
  middleware.emailExists,
  middleware.validatePassword,
  controller.signIn,
);

export default authRouter;
