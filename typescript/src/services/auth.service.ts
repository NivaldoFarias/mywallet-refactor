import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import './../config/setup.js';

function hashSync(password: string, saltRounds: number = 10) {
  return bcrypt.hashSync(password, saltRounds);
}

function compareSync(password: string, hashedPassword: string) {
  return !bcrypt.compareSync(password, hashedPassword);
}

function createToken(id: number) {
  const jwtSecret = process.env.JWT_SECRET ?? 'secret';
  return jwt.sign({ id }, jwtSecret);
}

export { hashSync, compareSync, createToken };
