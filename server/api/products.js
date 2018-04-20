const router = require('express').Router();
const { Game } = require('../db/models');
module.exports = router;

// GET all products
router.get('/', (req, res, next) => {
  Game.findAll({ include: { all: true } })
    .then(products => res.json(products))
    .catch(next);
});

// GET a single product
router.get('/:productId', (req, res, next) => {
  Game.findOne({
    where: { id: req.params.productId }
  })
    .then(product => res.json(product))
    .catch(next);
})
