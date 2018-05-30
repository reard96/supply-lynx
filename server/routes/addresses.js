const router = require('express').Router();
const db = require('../../db');
const auth = require('../auth');
const { Address } = db.models;

router.get('/', auth, (req, res, next) => {
  if (!req.user) throw { status: 401 };
  Address.findAll()
    .then(addresses => {
      res.send(addresses);
    })
    .catch(next);
});

router.post('/', auth, (req, res, next) => {
  if (!req.user) throw { status: 401 };
  Address.create(req.body.address)
    .then(address => res.send(address))
    .catch(next);
});

router.get('/:id', auth, (req, res, next) => {
  if (!req.user) throw { status: 401 };
  Address.findById(req.params.id)
    .then(order => res.send(order))
    .catch(next);
});

router.delete('/:id', auth, (req, res, next) => {
  if (!req.user) throw { status: 401 };
  Address.findById(req.params.id)
    .then(address => address.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.put('/:id', auth, (req, res, next) => {
  if (!req.user) throw { status: 401 };
  Address.findById(req.params.id)
    .then(address => {
      Object.assign(address, req.body.address);
      return address.save();
    })
    .then(address => {
      res.send(address);
    })
    .catch(next);
});

module.exports = router;
