import config from '../../../application/config';
import { inject, injectable } from 'inversify';
import { UsersApiResponseBody } from '../interfaces/user.interfaces';
import { UserServiceInterface, UserServiceType } from '../services/user.service';
const superagent = require('superagent');

export interface UserLoadTaskInterface {
  load(): Promise<void>;
}

@injectable()
export class UserLoadTask implements UserLoadTaskInterface {
  private apiUrl: string;
  private perPage: number;
  private totalPages: number;

  constructor(
    @inject(UserServiceType) private userService: UserServiceInterface
  ) {
    this.apiUrl = `${config.reqres.apiUrl}/users`;
    this.perPage = config.reqres.perPage;
  }

  async load(): Promise<void> {
    await this.init();

    for (let i = 1; i <= this.totalPages; i++) {
      await this.loadUsers(i);
    }
    // while (this.totalPages > 0) {
    //   this.loadUsers(this.totalPages);
    //   this.totalPages--;
    // }
  }

  private async init(): Promise<void> {
    await superagent.get(this.apiUrl)
      .send({
        per_page: this.perPage
      }).then(response => {
        const resBody = response.body as UsersApiResponseBody;

        this.totalPages = resBody.total_pages;
      }).catch(console.error);
  }

  private async loadUsers(page: number): Promise<void> {
    await superagent.get(this.apiUrl)
      .send({
        per_page: this.perPage,
        page: page
      }).then(response => {
        const resBody = response.body as UsersApiResponseBody;

        resBody.data.forEach(async(user) => {
          await this.userService.store(user);
        });
      }).catch(console.error);
  }
}

const UserLoadTaskType = Symbol('UserLoadTaskInterface');
export { UserLoadTaskType };
