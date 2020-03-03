import * as chai from 'chai';
import app from '../app';
import httpStatus = require('http-status');
import('mocha');

chai.use(require('chai-http'));

const { expect, request } = chai;

describe('Application', () => {
  it('should return 404', (done) => {
    request(app).get('/random').set('Accept', 'application/json').end((err, res) => {
      expect(res.status).to.equal(httpStatus.NOT_FOUND);
      done();
    });
  });

  it('should return 406', done => {
    request(app).get('/users').end((err, res) => {
      expect(res.status).to.equal(httpStatus.NOT_ACCEPTABLE);
      done();
    });
  });
});
