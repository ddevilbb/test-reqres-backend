import config from './config';
import { container } from '../src/application/ioc.container';
import { ConnectionOptions, createConnection, getConnection } from 'typeorm';
import { User } from '../src/domains/user/entities/user';
import { cleanUpMetadata } from 'inversify-express-utils';

const ormOptions: ConnectionOptions = config.typeOrm as ConnectionOptions;

before(async() => {
  container.snapshot();
  /* istanbul ignore next */
  createConnection(ormOptions).then(async connection => {
    await loadFixtures();
  }).catch(error => console.log('TypeORM connection error: ', error));
});

after(async() => {
  container.restore();
  await clearFixtures();
  await getConnection().close();
});

async function loadFixtures() {
  await usersFixtures();
}

async function usersFixtures() {
  const users = require('./fixtures/users');

  getConnection().getRepository(User).save(users);
}

async function clearFixtures() {
  await getConnection().getRepository(User).clear();
}

beforeEach(() => {
  cleanUpMetadata();
});
