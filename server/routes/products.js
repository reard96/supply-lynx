const router = require('express').Router();
const db = require('../../db');
const { Product } = db.models;

router.get('', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.send(product))
    .catch(next);
});
router.post('/', (req, res, next) => {
  Product.create(req.body.product)
    .then(product => res.send(product))
    .catch(next);
});
router.put('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      Object.assign(product, req.body.product);
      return product.save();
    })
    .then(product => res.send(product))
    .catch(next);
});

module.exports = router;
