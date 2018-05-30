const router = require('express').Router();
const passport = require('passport');
const db = require('../../db');
const { User } = db.models;
const { clientID, clientSecret } = require('../../secret');

router.use(passport.initialize());

router.get('/github', passport.authenticate('github', { session: false }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/', session: false }),
  function (req, res) {
    const token = req.user.generateToken();
    res.redirect(`/?token=${token}`);
  }
);

const GitHubStrategy = require('passport-github').Strategy;

passport.use(
  new GitHubStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: 'http://localhost:3000/api/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, cb) {
      const attr = { githubId: profile.id };
      User.findOne({ where: attr })
        .then(user => {
          if (user) {
            return user;
          }
          return User.create(
            Object.assign(attr, {
              username: `Github-${profile.id}`
            })
          );
        })
        .then(user => {
          return cb(null, user);
        })
        .catch(ex => cb(ex));
    }
  )
);

module.exports = router;
