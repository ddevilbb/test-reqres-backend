import 'reflect-metadata';
import { Container } from 'inversify';
import './controllers/users.controller';
import { UserService, UserServiceInterface, UserServiceType } from './services/user.service';
import { UserTransformer, UserTransformerInterface, UserTransformerType } from './transformers/user.transformer';

let container = new Container();

// transformers
container.bind<UserTransformerInterface>(UserTransformerType).to(UserTransformer).inSingletonScope();

// services
container.bind<UserServiceInterface>(UserServiceType).to(UserService).inSingletonScope();

// middlewares

export { container };
