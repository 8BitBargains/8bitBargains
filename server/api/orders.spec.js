const db = require('../db');
const app = require('../index');
const Order = db.model('order');
const User = db.model('user');
const { expect } = require('chai');
const request = require('supertest');

describe('Order Tests ', () => {
  beforeEach('Synchronize and clear database', () => db.sync({ force: true }));

  after('Synchronize and clear database', () => db.sync({ force: true }));

  describe('Order routes', () => {
    beforeEach(() => {
      return db.sync({ force: true });
    });

    describe('/api/orders/', () => {
      const codysEmail = 'cody@puppybook.com';
      const address = '42 Wallabe Way,Sydney,AU';
      const sessionId = 'fakeSessionId1';

      beforeEach(() => {
        return User.create({
          email: codysEmail,
          password: '123'
        }).then(user => {
          return Order.create({
            address,
            sessionId,
            userId: user.id
          });
        });
      });

      it('GET /api/orders', () => {
        return request(app)
          .get('/api/orders')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body[0].address).to.be.equal(address);
          });
      });
    });
  }); // end describe('/api/orders')
}); // end describe('Order routes')
