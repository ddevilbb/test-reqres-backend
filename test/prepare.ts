const prepare = require('mocha-prepare');
import 'reflect-metadata';
import { createConnection } from 'typeorm';

prepare(function (done) {
  createConnection({
    'type': 'postgres',
    'host': '10.201.0.3',
    'port': 5432,
    'username': 'admin',
    'password': 'hard_password',
    'database': 'test-reqres-test',
    'synchronize': true,
    'logging': false,
    'entities': [
      'src/**/entities/**/*.ts'
    ],
    'migrations': [
      'src/**/migrations/**/*.ts'
    ],
    'subscribers': [
      'src/**/subscriber/**/*.ts'
    ]
  }).then(async connection => {
    done();
  });
});
