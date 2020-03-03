import 'reflect-metadata';
import * as express from 'express';
import { Container } from 'inversify';
import '../application/controllers/users.controller';
import { UserService, UserServiceInterface, UserServiceType } from '../domains/user/services/user.service';
import { UserTransformer, UserTransformerInterface, UserTransformerType } from '../domains/user/transformers/user.transformer';
import {
  UserLoadTask,
  UserLoadTaskInterface,
  UserLoadTaskType,
} from '../domains/user/tasks/user.load.task';
import * as UserValidation from '../domains/user/middlewares/user.validation.middleware';
import * as CommonValidation from '../core/middlewares/common.validation.middleware';

let container = new Container();

// transformers
container.bind<UserTransformerInterface>(UserTransformerType).to(UserTransformer).inSingletonScope();

// services
container.bind<UserServiceInterface>(UserServiceType).to(UserService).inSingletonScope();
container.bind<UserLoadTaskInterface>(UserLoadTaskType).to(UserLoadTask).inSingletonScope();

// middlewares
container.bind<express.RequestHandler>('OnlyAcceptApplicationJson').toConstantValue(
  (req: any, res: any, next: any) => CommonValidation.onlyAcceptApplicationJson(req, res, next)
);
container.bind<express.RequestHandler>('UserSearchValidation').toConstantValue(
  (req: any, res: any, next: any) => UserValidation.searchUsers(req, res, next)
);

export { container };
