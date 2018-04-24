const router = require('express').Router();
const { User } = require('../db/models');
const { isLoggedIn, isAdmin } = require('../utils/gatekeeperMiddleware');
module.exports = router;

router.use(isLoggedIn, isAdmin);

router.get('/', (req, res, next) => {
  User
    .findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
    .then(users => res.json(users))
    .catch(next);
});

router.put('/adminStatus', (req, res, next) => {
  let id = req.body.userId;
  let adminStatus;

  User
    .findOne({ where: { id } })
    .then(user => {
      adminStatus = !user.isAdmin;
      user.isAdmin = adminStatus;
      user.save();

      res.status(204).send(adminStatus);
    })
    .catch(next);
});
