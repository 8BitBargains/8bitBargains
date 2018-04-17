/* global describe beforeEach it */
// TODO

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Game = db.model('game')

describe('Game routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/games/', () => {

    beforeEach(() => {

    })

    it('GET /api/games', () => {

    })
  }) // end describe('/api/games')
}) // end describe('Game routes')
