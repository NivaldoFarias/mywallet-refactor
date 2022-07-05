import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import './../config/setup.js';

function hashSync(password, saltRounds) {
  return bcrypt.hashSync(password, saltRounds);
}

function compareSync(password, hashedPassword) {
  return !bcrypt.compareSync(password, hashedPassword);
}

function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}

export { hashSync, compareSync, createToken };
