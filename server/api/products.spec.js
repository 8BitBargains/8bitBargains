/* global describe beforeEach it */
// TODO

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/products/', () => {

    beforeEach(() => {

    })

    it('GET /api/products', () => {

    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
