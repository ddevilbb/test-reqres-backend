import * as chai from 'chai';
import app from '../app';
import('mocha');

chai.use(require('chai-http'));

const { expect, request } = chai;

describe('Application', () => {
  it('should return 404', (done) => {
    request(app).get('/random').set('Accept', 'application/json').end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    });
  });
});
