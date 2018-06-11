const router = require('express').Router();
const { Service } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Service.findAll({ include: [{ all: true }] })
    .then(services => res.json(services))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Service.findById(req.params.id, { include: [{ all: true }] })
    .then(service => res.json(service))
    .catch(next);
});
