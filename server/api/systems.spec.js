const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const System = db.model('system');

// tests all routes for system model
describe('Genre routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/systems/', () => {
    const newSystem = 'MegaSystem10';

    beforeEach(() => {
      return System.create({
        name: newSystem
      });
    });

    it('GET /api/systems', () => {
      return request(app)
        .get('/api/systems')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(newSystem);
        });
    });

    it('GET /api/systems/:id', () => {
      return request(app)
        .get('/api/systems/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.be.equal(newSystem);
        });
    });
  }); // end describe('/api/systems')
}); // end describe('System routes')
