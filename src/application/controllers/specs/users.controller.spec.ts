import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as factory from './test.app.factory';

chai.use(chaiHttp);

const { expect, request } = chai;

require('../../../../test/load.fixtures');

const getRequest = (customApp, url: string) => {
  return request(customApp)
    .get(url)
    .set('Accept', 'application/json');
};

describe('Users controller test', () => {
  describe('GET /users', () => {
    it('should return users list', (done) => {
      getRequest(factory.testApp(), '/users').end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an.instanceOf(Array);
        done();
      });
    });

    it('should return users list by search string', (done) => {
      const query = {
        search: 'Test'
      };
      getRequest(factory.testApp(), '/users/search').query(query).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an.instanceOf(Array);
        done();
      });
    });
  });
});
