/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Order = db.model('order');

// tests and things and wow everything works great!!!

describe('Game routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/orders/', () => {

    beforeEach(() => {

    });

    it('GET /api/orders', () => {

    });

  describe('/api/orders/:orderId', () => {

    beforeEach(() => {

    });

    it('GET /api/orders/:orderId/games', () => {

    });

    it('POST /api/orders/:orderId/games', () => {

    });

    it('PUT /api/orders/:orderId/games', () => {

    });

  describe('/api/orders/allOrders', () => {

    beforeEach(() => {

    });

    it('GET /api/orders/allOrders', () => {

    });
  }); // end describe('/api/orders')
});// end describe('Order routes')