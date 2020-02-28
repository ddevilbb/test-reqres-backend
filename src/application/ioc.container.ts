import 'reflect-metadata';
import { Container } from 'inversify';
import '../application/controllers/users.controller';
import { UserService, UserServiceInterface, UserServiceType } from '../domains/user/services/user.service';
import { UserTransformer, UserTransformerInterface, UserTransformerType } from '../domains/user/transformers/user.transformer';
import {
  UserLoadService,
  UserLoadServiceInterface,
  UserLoadServiceType,
} from '../domains/user/services/user.load.service';

let container = new Container();

// transformers
container.bind<UserTransformerInterface>(UserTransformerType).to(UserTransformer).inSingletonScope();

// services
container.bind<UserServiceInterface>(UserServiceType).to(UserService).inSingletonScope();
container.bind<UserLoadServiceInterface>(UserLoadServiceType).to(UserLoadService).inSingletonScope();

// middlewares

export { container };
