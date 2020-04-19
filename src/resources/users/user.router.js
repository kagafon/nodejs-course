const router = require('express').Router();
const { User } = require('./user.model');
const { OK, NO_CONTENT } = require('http-status-codes');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      res
        .status(OK)
        .json(await (await usersService.getAll()).map(User.toResponse));
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    const { name, login, password } = req.body;
    try {
      res
        .status(OK)
        .json(User.toResponse(await usersService.add(name, login, password)));
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:userId')
  .get(async (req, res, next) => {
    try {
      res
        .status(OK)
        .json(User.toResponse(await usersService.getById(req.params.userId)));
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    const { name, login, password } = req.body;
    try {
      res
        .status(OK)
        .json(
          User.toResponse(
            await usersService.update(req.params.userId, name, login, password)
          )
        );
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      res.status(NO_CONTENT).json(await usersService.del(req.params.userId));
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
