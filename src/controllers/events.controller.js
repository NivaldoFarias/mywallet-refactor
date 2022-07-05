import * as repository from './../repositories/events.repository.js';
import * as service from './../services/events.service.js';

async function newEvent(_req, res) {
  const {
    user: { id },
    body: { value, type },
  } = res.locals;

  await repository.createInstance(id, value, type);
  res.sendStatus(201);
}

async function userEvents(_req, res) {
  const {
    user: { id },
  } = res.locals;

  const events = await repository.userEvents(id);
  res.send(events.rows);
}

async function eventsSum(_req, res) {
  const {
    user: { id },
  } = res.locals;

  const events = await repository.userEvents(id);
  const sum = service.calculateSum(events.rows);

  res.send({ sum });
}

export { newEvent, userEvents, eventsSum };
