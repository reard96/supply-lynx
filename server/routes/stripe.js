const router = require('express').Router();
const stripe = require('stripe')(process.env.stripeSecretKey);

router.post('/pay', (req, res, next) => {
  stripe.charges.create(req.body, (err) => {
    if (err) {
      res.status(500).send({ error: err });
    }
  })
    .then(() => res.sendStatus(201))
    .catch(next);
});

module.exports = router;
