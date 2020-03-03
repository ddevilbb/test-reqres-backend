import * as chai from 'chai';
import { container } from '../../../../application/ioc.container';
import { UserLoadTaskInterface, UserLoadTaskType } from '../user.load.task';
import { UserServiceInterface, UserServiceType } from '../../services/user.service';
import config from '../../../../../test/config';
import * as superagent from 'superagent';
import { UsersApiResponseBody } from '../../interfaces/user.interfaces';

const { expect } = chai;

const userLoadTask = container.get<UserLoadTaskInterface>(UserLoadTaskType);
const userService = container.get<UserServiceInterface>(UserServiceType);
const apiUrlUsers = `${config.reqres.apiUrl}/users`;


require('../../../../../test/load.fixtures');

describe('User load task tests', () => {
  it('should load users from API to database', async() => {
    const apiUsers = await superagent.get(apiUrlUsers).send({
      per_page: config.reqres.perPage
    }).then(response => {
      const body = response.body as UsersApiResponseBody;

      return body.data;
    });

    await userLoadTask.load();

    const users = await userService.findAll();
    const usersIds = users.map(user => user.id);

    apiUsers.forEach(user => {
      expect(usersIds).to.include(user.id);
    });
  });
});
