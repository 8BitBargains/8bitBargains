const router = require('express').Router();
const { Genre } = require('../db/models');
module.exports = router;

// GET all genres
router.get('/', (req, res, next) => {
  Genre.findAll()
    .then(genres => res.json(genres))
    .catch(next);
});

// GET a single genre
router.get('/:genreId', (req, res, next) => {
  Genre.findOne({
    where: { id: req.params.genreId }
  })
    .then(genre => res.json(genre))
    .catch(next);
});
