const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Genre = db.model('genre');

// tests all routes for genre model
describe('Genre routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/genres/', () => {
    const newGenre = 'Awesome';

    beforeEach(() => {
      return Genre.create({
        name: newGenre
      });
    });

    it('GET /api/genres', () => {
      return request(app)
        .get('/api/genres')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(newGenre);
        });
    });

    it('GET /api/genres/:id', () => {
      return request(app)
        .get('/api/genres/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.be.equal(newGenre);
        });
    });
  }); // end describe('/api/genres')
}); // end describe('Genre routes')
