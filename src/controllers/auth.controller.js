import * as repository from './../repositories/auth.repository.js';
import * as service from './../services/auth.service.js';

async function signUp(_req, res) {
  const {
    user: { name, email, password },
  } = res.locals;

  const hashedPassword = service.hashSync(password, 12);
  await repository.createInstance(name, email, hashedPassword);
  res.sendStatus(201);
}

function signIn(_req, res) {
  const {
    user: { id },
  } = res.locals;

  const token = service.createToken(id);
  res.send({ token });
}

export { signUp, signIn };
