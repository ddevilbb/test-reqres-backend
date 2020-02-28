import * as chai from 'chai';
import { User } from '../user';
import { UserDataInterface } from '../../interfaces/user.interfaces';

const { expect } = chai;

describe('User entity tests', () => {
  it('should create and return new User entity', function (done) {
    const userData: UserDataInterface = {
      id: 1,
      email: 'test@test.ru',
      first_name: 'John',
      last_name: 'Smith',
      avatar: 'some image url'
    };
    const user = User.create(userData);

    expect(user).to.be.an.instanceOf(User);
    expect(user.id).to.equal(userData.id);
    expect(user.email).to.equal(userData.email);
    expect(user.firstName).to.equal(userData.first_name);
    expect(user.lastName).to.equal(userData.last_name);
    expect(user.avatar).to.equal(userData.avatar);
    done();
  });
});
