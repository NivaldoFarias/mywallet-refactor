import express, { json } from 'express';
import helmet from 'helmet';
import 'express-async-errors';
import cors from 'cors';

import ExceptionHandler from './middlewares/errors.middleware.js';
import router from './routes/index.js';

const app = express();
app.use(cors());
app.use(json());
app.use(helmet());
app.use(router);
app.use(ExceptionHandler);

export default app;
