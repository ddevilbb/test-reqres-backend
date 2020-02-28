import * as chai from 'chai';
import { container } from '../../../../application/ioc.container';
import { UserServiceInterface, UserServiceType } from '../../services/user.service';
import { UserTransformerInterface, UserTransformerType } from '../user.transformer';

const { expect } = chai;

const userService = container.get<UserServiceInterface>(UserServiceType);
const userTransformer = container.get<UserTransformerInterface>(UserTransformerType);

require('../../../../../test/load.fixtures');

describe('User transformer tests', () => {
  it('Should return transformed users result', async() => {
    const users = await userService.findAll();
    const transformedUsers = userTransformer.list(users);

    expect(transformedUsers).to.be.an.instanceOf(Array);
  });
});
