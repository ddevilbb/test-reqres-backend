import { injectable } from 'inversify';
import { User } from '../entities/user';
import { getConnection, Like } from 'typeorm';
import { UserDataInterface } from '../interfaces/user.interfaces';

export interface UserServiceInterface {
  store(data: UserDataInterface): Promise<User>;
  findAll(): Promise<User[]>;
  find(id: string): Promise<User>;
  search(search: string): Promise<User[]>;
}

@injectable()
export class UserService implements UserServiceInterface {
  async store(data: UserDataInterface): Promise<User> {
    const user = User.create(data);

    await getConnection().getRepository(User).save(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    return getConnection().getRepository(User).find();
  }

  async find(id: string): Promise<User> {
    return getConnection().getRepository(User).findOne(id);
  }

  async search(search: string): Promise<User[]> {
    return getConnection().getRepository(User).find({
      where: [
        { firstName: Like(`%${search}%`) },
        { lastName: Like(`%${search}%`) }
      ]
    });
  }
}

const UserServiceType = Symbol('UserServiceInterface');
export { UserServiceType };
