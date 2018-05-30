const router = require('express').Router();
const googleSecret = process.env.G_SECRET;

const googleMapsClient = require('@google/maps').createClient({
  key: googleSecret,
  Promise: Promise
});

router.post('/getpredictions', (req, res, next) => {
  googleMapsClient.placesAutoComplete({ input: req.body.input }).asPromise()
    .then(resp => resp.json.predictions)
    .then(predictions => res.send(predictions));
});
router.post('/getplace', (req, res, next) => {
  googleMapsClient.reverseGeocode({ place_id: req.body.query }).asPromise()
    .then(resp => res.send(resp.json.results))
    .catch(next);
});

module.exports = router;
