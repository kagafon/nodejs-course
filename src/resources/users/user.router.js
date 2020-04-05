const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const { name, login, password } = req.body;
    const user = await usersService.add(name, login, password);
    res.json(User.toResponse(user));
  });

router
  .route('/:uid')
  .get(async (req, res) => {
    const user = await usersService.getById(req.params.uid);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(404).send('Not found.');
    }
  })
  .put(async (req, res) => {
    const { name, login, password } = req.body;
    const user = await usersService.update(
      req.params.uid,
      name,
      login,
      password
    );
    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(404).send('Not found.');
    }
  })
  .delete(async (req, res) => {
    const deletedUser = await usersService.del(req.params.uid);
    if (deletedUser) {
      res.json(User.toResponse(deletedUser));
    } else {
      res.status(404).send('Not found.');
    }
  });

module.exports = router;
