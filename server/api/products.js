const router = require('express').Router();
const { Product } = require('../db/models');
module.exports = router;

// GET all products
router.get('/', (req, res, next) => {
  Product.findAll({ include: { all: true } })
    .then(products => res.json(products))
    .catch(next);
});

// GET a single product
router.get('/:productId', (req, res, next) => {
  Product.findOne({
    where: { id: req.params.productId }
  })
    .then(product => res.json(product))
    .catch(next);
})
