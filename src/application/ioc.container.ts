import 'reflect-metadata';
import { Container } from 'inversify';
import '../application/controllers/users.controller';
import { UserService, UserServiceInterface, UserServiceType } from '../domains/user/services/user.service';
import { UserTransformer, UserTransformerInterface, UserTransformerType } from '../domains/user/transformers/user.transformer';
import {
  UserLoadTask,
  UserLoadTaskInterface,
  UserLoadTaskType,
} from '../domains/user/tasks/user.load.task';

let container = new Container();

// transformers
container.bind<UserTransformerInterface>(UserTransformerType).to(UserTransformer).inSingletonScope();

// services
container.bind<UserServiceInterface>(UserServiceType).to(UserService).inSingletonScope();
container.bind<UserLoadTaskInterface>(UserLoadTaskType).to(UserLoadTask).inSingletonScope();

// middlewares

export { container };
