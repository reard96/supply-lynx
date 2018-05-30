const router = require('express').Router();
const db = require('../../db');
const auth = require('../auth');
const mustHaveUser = require('../auth');
const { User, LineItem } = db.models;

router.get('/', (req, res, next) => {
  User.exchangeToken(req.headers.token)
    .then(user => {
      res.send(user);
    })
    .catch(next);
});

router.get('/all', auth, (req, res, next) => {
  if (!req.user || !req.user.admin) throw { status: 401 };
  User.findAll({
    where: { id: { $ne: req.user.id } },
    order: ['firstName']
  })
    .then(users => {
      res.send(users);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  User.create(req.body.user)
    .then(user => res.send(user))
    .catch(next);
});

router.put('/:userId', auth, (req, res, next) => {
  if (!req.user || (req.user.id !== req.params.userId && !req.user.admin)) next({ status: 401 });
  User.findById(req.params.userId)
    .then(user => {
      Object.assign(user, req.body.user);
      return user.save();
    })
    .then(user => {
      res.send(user);
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  User.authenticate(req.body.user)
    .then(token => {
      res.send(token);
    })
    .catch(next);
});

router.get('/:userId/cart', auth, (req, res, next) => {
  if (!req.user || req.user.id !== req.params.userId) next({ status: 401 });
  User.findOrCreateCart(req.params.userId)
    .spread(cart => res.send(cart))
    .catch(next);
});

router.get('/:userId/orders', auth, (req, res, next) => {
  if (!req.user || req.user.id !== req.params.userId) next({ status: 401 });
  User.findById(req.params.userId)
    .then(user =>
      user.getOrders({
        where: { status: 'order' },
        include: [{ model: LineItem }]
      }))
    .then(orders => res.send(orders))
    .catch(next);
});

router.get('/:userId/addresses', [auth, mustHaveUser], (req, res, next) => {
  if (!req.user || req.user.id !== req.params.userId) next({ status: 401 });
  User.findById(req.params.userId)
    .then(user =>
      user.getAddresses({
        where: { userId: user.id }
      }))
    .then(addresses => {
      res.send(addresses);
    })
    .catch(next);
});

module.exports = router;
