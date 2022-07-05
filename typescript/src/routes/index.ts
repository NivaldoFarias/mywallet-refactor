import express from 'express';

import authRouter from './auth.router.js';
import eventsRouter from './events.router.js';

const router = express.Router();

router.use(eventsRouter);
router.use(authRouter);

export default router;
