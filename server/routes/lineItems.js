const router = require('express').Router();
const db = require('../../db');
const { LineItem } = db.models;

router.get('', (req, res, next) => {
  LineItem.findAll()
    .then(lineItems => res.send(lineItems))
    .catch(next);
});

router.post('/', (req, res, next) => {
  LineItem.create(req.body)
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => {
      Object.assign(lineItem, req.body);
      return lineItem.save();
    })
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => lineItem.destroy())
    .then(() => res.send())
    .catch(next);
});

module.exports = router;
