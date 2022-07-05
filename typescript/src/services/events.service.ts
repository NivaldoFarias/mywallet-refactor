import jwt from 'jsonwebtoken';
import './../config/setup.js';

function calculateSum(events: any[]) {
  return events.reduce((total, event) => {
    event.type === 'INCOME' ? total + event.value : total - event.value, 0;
  });
}

function verifyToken(token: string) {
  const jwtSecret = process.env.JWT_SECRET ?? 'secret';
  return jwt.verify(token, jwtSecret);
}

export { calculateSum, verifyToken };
