const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/products/', () => {
    const newTitle = 'Best Game Ever';
    const newPrice = 500;
    const newDescription = 'The title says it all.';
    const newInventory = 5;

    beforeEach(() => {
      return Product.create({
        title: newTitle,
        price: newPrice,
        description: newDescription,
        inventory: newInventory
      });
    });

    it('GET /api/products', () => {
      return request(app)
      .get('/api/products')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body[0].title).to.be.equal(newTitle);
      });
    });

    it('GET /api/products/1', () => {
      return request(app)
      .get('/api/products/1')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.be.equal(newTitle);
      });
    });
  }); // end describe('/api/products')
}); // end describe('Product routes')
