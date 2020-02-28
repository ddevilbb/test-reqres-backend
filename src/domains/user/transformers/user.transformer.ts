import { User } from '../entities/user';
import { UserDataInterface } from '../interfaces/user.interfaces';
import { injectable } from 'inversify';

export interface UserTransformerInterface {
  list(users: User[]): UserDataInterface[];
  item(user: User): UserDataInterface;
}

@injectable()
export class UserTransformer implements UserTransformerInterface {
  list(users: User[]): UserDataInterface[] {
    return users.map((user) => this.item(user));
  }

  item(user: User): UserDataInterface {
    return {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      avatar: user.avatar
    };
  }
}

const UserTransformerType = Symbol('UserTransformetInterface');
export { UserTransformerType };
