import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { UserDataInterface } from '../interfaces/user.interfaces';

@Entity()
export class User implements Object {
  @ObjectIdColumn({
    type: 'integer',
    name: 'id'
  })
  id: number;

  @Column('varchar')
  email: string;

  @Column({
    type: 'varchar',
    name: 'first_name'
  })
  firstName: string;

  @Column({
    type: 'varchar',
    name: 'last_name'
  })
  lastName: string;

  @Column('varchar')
  avatar: string;

  static create(data: UserDataInterface): User {
    let user = new User();

    user.id = data.id;
    user.email = data.email;
    user.firstName = data.first_name;
    user.lastName = data.last_name;
    user.avatar = data.avatar;

    return user;
  }
}
