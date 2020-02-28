import * as http from 'http';
import 'reflect-metadata';
import app from '../app';
import { ConnectionOptions, createConnection } from 'typeorm';
import config from '../config';

const httpServer = http.createServer(app);
const ormOptions: ConnectionOptions = config.typeOrm as ConnectionOptions;

createConnection(ormOptions).then(async connection => {
  httpServer.listen(config.app.port);
}).catch(error => console.log('TypeORM connection error: ', error));
