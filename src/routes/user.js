const express = require('express');

const router = express.Router();

const passportGithub = require('../auth/githubAuth');
const checkAuth = require('../middleware/checkAuth');
const UserController = require('../controllers/UserController');

router.post('/signup', UserController.signUp);

router.post('/login', UserController.login);

router.delete('/:id', checkAuth, UserController.delete);

router.get('/auth/github', passportGithub.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    console.log(req.user);
    res.json(req.user);
  },
);

module.exports = router;
