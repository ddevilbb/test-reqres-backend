import * as http from 'http';
import 'reflect-metadata';
import app from '../app';
import { ConnectionOptions, createConnection } from 'typeorm';
import config from '../config';
import * as cron from 'node-cron';
import {
  UserLoadTask,
  UserLoadTaskInterface,
  UserLoadTaskType,
} from '../../domains/user/tasks/user.load.task';
import { container } from '../ioc.container';
import { UserServiceInterface } from '../../domains/user/services/user.service';

const httpServer = http.createServer(app);
const ormOptions: ConnectionOptions = config.typeOrm as ConnectionOptions;
const userLoadTask: UserLoadTaskInterface = container.get<UserLoadTaskInterface>(UserLoadTaskType);

createConnection(ormOptions).then(async connection => {
  cron.schedule('* * * * *', () => {
    userLoadTask.load();
  });
  httpServer.listen(config.app.port);
}).catch(error => console.log('TypeORM connection error: ', error));
