const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    include: [{ all: true }]
  })
    .then(users => res.json(users))
    .catch(next)
})

// router.get('/:id', (req, res, next) => {
//   User.findById(req.params.id, { include: [{ all: true }] })
//     .then(user => res.json(user))
//     .catch(next)
// })

router.get('/:address', (req, res, next) => {
  User.findOne({ where: { address: req.params.address }, include: [{ all: true }] })
    .then(user => res.send(user))
    .catch(next)
})
