import * as chai from 'chai';
import { User } from '../../entities/user';
import { container } from '../../../../application/ioc.container';
import { UserServiceInterface, UserServiceType } from '../user.service';

const { expect } = chai;

const userService = container.get<UserServiceInterface>(UserServiceType);

require('../../../../../test/load.fixtures');

describe('User service tests', () => {
  it('should create and return new User entity', async() => {
    const userData = {
      id: 5,
      email: 'test5@test.ru',
      first_name: 'Test5',
      last_name: 'Test5',
      avatar: 'avatar_test5'
    };
    const user = await userService.store(userData);

    expect(user).to.be.an.instanceOf(User);
    expect(user.id).to.equal(userData.id);
    expect(user.email).to.equal(userData.email);
    expect(user.firstName).to.equal(userData.first_name);
    expect(user.lastName).to.equal(userData.last_name);
    expect(user.avatar).to.equal(userData.avatar);
  });

  it('should return array of Users entities', async() => {
    const users = await userService.findAll();

    expect(users).to.be.an.instanceOf(Array);
    expect(users[0]).to.be.an.instanceOf(User);
  });

  it('should return array of Users entities by search', async() => {
    const search = 'Test1';
    const users = await userService.search(search);

    expect(users).to.be.an.instanceOf(Array);
    expect(users[0]).to.be.an.instanceOf(User);
  });
});
