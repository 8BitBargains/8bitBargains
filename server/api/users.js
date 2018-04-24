const router = require('express').Router();
const { User } = require('../db/models');
const { isLoggedIn, isAdmin } = require('../utils/gatekeeperMiddleware');
module.exports = router;

<<<<<<< HEAD
router.get('/', isLoggedIn, isAdmin, (req, res, next) => {
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
=======
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

  User
    .findOne({ where: { id } })
    .then(user => {
      user.isAdmin = !user.isAdmin;
      user.save();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});
>>>>>>> master
