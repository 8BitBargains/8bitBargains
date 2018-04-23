const router = require('express').Router();
const { User } = require('../db/models');
const { isLoggedIn, isAdmin } = require('../utils/gatekeeperMiddleware');
module.exports = router;

router.get('/',
  isLoggedIn,
  isAdmin,
  (req, res, next) => {
    console.log(req.session);
    User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
      .then(users => res.json(users))
      .catch(next);
  });
