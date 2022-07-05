import { Request, Response, NextFunction } from 'express';

import * as service from '../services/events.service.js';
import AppError from '../config/error.js';

function newEventData(req: Request, res: Response, next: NextFunction) {
  const { value, type } = req.body;
  const authorization = req.headers.authorization || '';

  res.locals.body = { value, type };
  res.locals.headers = { authorization };
  return next();
}

function tokenExists(_req: Request, res: Response, next: NextFunction) {
  const {
    headers: { authorization },
  } = res.locals;
  const token = authorization.replace('Bearer ', '');

  if (!token) {
    throw new AppError(
      'Missing token',
      401,
      'Missing token',
      'Ensure that the token is provided',
    );
  }

  res.locals.token = token;
  return next();
}

async function validateToken(_req: Request, res: Response, next: NextFunction) {
  const { token } = res.locals;

  try {
    const user = service.verifyToken(token);
    res.locals.user = user;
  } catch {
    throw new AppError(
      'Invalid token',
      401,
      'Invalid token',
      'Ensure that the token is valid',
    );
  }

  return next();
}

function validateBody(_req: Request, res: Response, next: NextFunction) {
  const {
    body: { value, type },
  } = res.locals;
  const financialTypes = ['INCOME', 'OUTCOME'];
  const invalidInput =
    !value || !type || !financialTypes.includes(type) || value < 0;

  if (invalidInput) {
    throw new AppError(
      'Invalid input',
      422,
      'Invalid input',
      'Ensure that all required fields are valid',
    );
  }

  return next();
}

function eventsData(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization || '';

  res.locals.headers = { authorization };
  return next();
}

export { newEventData, tokenExists, validateToken, validateBody, eventsData };
