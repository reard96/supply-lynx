const app = require('express').Router()
const {Service} = require('../db/models')
module.exports = app

app.get('/', (req, res, next) => {
  Service.findAll()
    .then(services => res.send(services))
    .catch(next)
})


app.post('/', (req, res, next) => {
  Service.create(req.body)
    .then(service => res.send(service))
    .catch(next);
})

app.get('/:id', (req, res, next) => {
  Service.findById(req.params.id)
    .then(service => res.send(service))
    .catch(next)
})

app.put("/:id", (req, res, next) => {
  Service.findById(req.params.id)
    .then(service => {
      Object.assign(service, req.body)
      return service.save();
    })
    .then(service => res.send(service))
    .catch(next);
});
