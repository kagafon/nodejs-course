const router = require('express').Router();
const { OK, BAD_REQUEST } = require('http-status-codes');
const authService = require('./auth.service');

router
  .route('/')
  .post(async (req, res, next) => {
    try {
      const { login, password } = req.body;
      res.status(OK).json(await authService.authenticate(login, password));
    } catch (err) {
      return next(err);
    }
  })
  .all(async (req, res) => res.status(BAD_REQUEST).send());

module.exports = router;
