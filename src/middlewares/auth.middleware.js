import * as repository from './../repositories/auth.repository.js';
import * as service from './../services/auth.service.js';
import AppError from './../config/error.js';

async function validateSignUp(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError(
      'Missing required fields',
      422,
      'Missing required fields',
      'Ensure that all required fields are filled',
    );
  }

  res.locals.user = { name, email, password };
  return next();
}

async function emailIsUnique(_req, res, next) {
  const { email } = res.locals.user;
  const existingUsers = await repository.findEmail(email);

  if (existingUsers.rowCount > 0) {
    throw new AppError(
      'Email already exists',
      409,
      'Email already exists',
      'Ensure that the email is unique',
    );
  }

  return next();
}

function validateSignIn(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(
      'Missing required fields',
      422,
      'Missing required fields',
      'Ensure that all required fields are filled',
    );
  }

  res.locals.input = { email, password };
  return next();
}

async function emailExists(_req, res, next) {
  const { email } = res.locals.input;
  const result = await repository.findEmail(email);

  if (result.rowCount === 0) {
    throw new AppError(
      'Email does not exist',
      404,
      'Email does not exist',
      'Ensure that the email is correct',
    );
  }

  res.locals.user = result.rows[0];
  return next();
}

function validatePassword(_req, res, next) {
  const {
    user: { password },
    input: { password: inputPassword },
  } = res.locals;

  const invalidPassword = service.compareSync(inputPassword, password);
  if (invalidPassword) {
    throw new AppError(
      'Invalid password',
      401,
      'Invalid password',
      'Ensure that the password is correct',
    );
  }

  return next();
}

export {
  validateSignUp,
  emailIsUnique,
  validateSignIn,
  emailExists,
  validatePassword,
};
