const { User } = require('../db').models;

const auth = (req, res, next) => {
  if (!req.headers.token) {
    next();
  }
  User.exchangeToken(req.headers.token)
    .then(user => {
      req.user = user.dataValues;
      next();
    })
    .catch(next);
};

const mustHaveUser = (req, res, next) => {
  if (!req.user) {
    throw next({ status: 401 });
  }
  if (req.user.id !== req.params.userId * 1) throw next({ status: 401 });
  next();
};

(module.exports = auth), mustHaveUser;
