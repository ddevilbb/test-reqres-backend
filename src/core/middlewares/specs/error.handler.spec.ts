import * as chai from 'chai';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import handle from '../error.handler';
import { ErrorWithCode } from '../../exceptions/exceptions';
import('mocha');

chai.use(require('chai-http'));

const { expect, request } = chai;

const app = express();

describe('Responses helper tests', () => {
  it('Test responseErrorWithObject', (done) => {
    const errCode = 400;
    const errMsg = 'Some error with code';
    const error = new ErrorWithCode(errMsg, errCode);
    app.use((req: Request, res: Response, next: NextFunction) => handle(error, req, res, next));

    request(app).get('/random').end((req, res) => {
      expect(res).to.have.property('status', errCode);
      expect(res).to.have.property('body');
      expect(res.body).to.have.property('message', errMsg);
      done();
    });
  });
});
