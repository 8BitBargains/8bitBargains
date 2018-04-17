const router = require('express').Router()
const { Game } = require('../db/models')
module.exports = router

// GET all games
router.get('/', (req, res, next) => {
  Game.findAll()
    .then(games => res.json(games))
    .catch(next)
})

// GET a single game
router.get('/:gameId', (req, res, next) => {
  Game.findOne({
    where: { id: req.params.gameId }
  })
    .then(game => res.json(game))
    .catch(next)
})
