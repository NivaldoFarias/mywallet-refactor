import jwt from 'jsonwebtoken';
import './../config/setup.js';

function calculateSum(events) {
  return events.reduce((total, event) => {
    event.type === 'INCOME' ? total + event.value : total - event.value, 0;
  });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export { calculateSum, verifyToken };
