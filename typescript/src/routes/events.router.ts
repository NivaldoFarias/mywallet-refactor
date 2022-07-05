import express from 'express';

import * as controller from './../controllers/events.controller.js';
import * as middleware from './../middlewares/events.middleware.js';

const PATH = '/financial-events';
const eventsRouter = express.Router();

eventsRouter.post(
  PATH,
  middleware.newEventData,
  middleware.tokenExists,
  middleware.validateToken,
  middleware.validateBody,
  controller.newEvent,
);
eventsRouter.get(
  PATH,
  middleware.eventsData,
  middleware.tokenExists,
  middleware.validateToken,
  controller.userEvents,
);
eventsRouter.get(
  `${PATH}/sum`,
  middleware.eventsData,
  middleware.tokenExists,
  middleware.validateToken,
  controller.eventsSum,
);

export default eventsRouter;
