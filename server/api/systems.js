const router = require('express').Router();
const { System } = require('../db/models');
module.exports = router;

// GET all systems
router.get('/', (req, res, next) => {
  System.findAll()
    .then(systems => res.json(systems))
    .catch(next);
});

// GET a single system
router.get('/:systemId', (req, res, next) => {
  System.findOne({
    where: { id: req.params.systemId }
  })
    .then(system => res.json(system))
    .catch(next);
});
