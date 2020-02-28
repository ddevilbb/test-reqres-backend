import * as chai from 'chai';
import * as express from 'express';
import { responseErrorWithObject, responseWith } from '../responses';
import { Request, Response, NextFunction } from 'express';
import { ErrorWithCode } from '../exceptions/exceptions';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';
import('mocha');

chai.use(require('chai-http'));

const { expect, request } = chai;

describe('Responses helper tests', () => {
  it('Test responseErrorWithObject without code', (done) => {
    const app = express();
    const errMsg = 'Test responseErrorWithObject without code';
    const error = new ErrorWithCode(errMsg);
    app.use((req: Request, res: Response, next: NextFunction) => responseErrorWithObject(res, error));

    request(app).get('/random').end((req, res) => {
      expect(res).to.have.property('status', INTERNAL_SERVER_ERROR);
      expect(res).to.have.property('body');
      expect(res.body).to.have.property('message', errMsg);
      done();
    });
  });

  it('Test responseWith without code', (done) => {
    const app = express();
    const errMsg = 'Test responseWith without code';
    const error = new ErrorWithCode(errMsg);
    app.use((req: Request, res: Response, next: NextFunction) => responseWith(res, { ...error, message: error.message }));

    request(app).get('/random').end((req, res) => {
      expect(res).to.have.property('status', OK);
      expect(res).to.have.property('body');
      expect(res.body).to.have.property('message', errMsg);
      done();
    });
  });

  it('Test responseErrorWithObject with code', (done) => {
    const app = express();
    const errCode = 400;
    const errMsg = 'Test responseErrorWithObject with code';
    const error = new ErrorWithCode(errMsg, errCode);
    app.use((req: Request, res: Response, next: NextFunction) => responseErrorWithObject(res, error, errCode));

    request(app).get('/random').end((req, res) => {
      expect(res).to.have.property('status', errCode);
      expect(res).to.have.property('body');
      expect(res.body).to.have.property('message', errMsg);
      done();
    });
  });

  it('Test responseWith with code', (done) => {
    const app = express();
    const errCode = 400;
    const errMsg = 'Test responseWith with code';
    const error = new ErrorWithCode(errMsg, errCode);
    app.use((req: Request, res: Response, next: NextFunction) => responseWith(res, { ...error, message: error.message }, errCode));

    request(app).get('/random').end((req, res) => {
      expect(res).to.have.property('status', errCode);
      expect(res).to.have.property('body');
      expect(res.body).to.have.property('message', errMsg);
      done();
    });
  });
});
