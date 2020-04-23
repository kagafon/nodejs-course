const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');
const { JWT_SECRET_KEY } = require('../../common/config');
const { Forbidden } = require('http-errors');

const authenticate = async (login, password) => {
  const user = await userService.getByLogin(login);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return { token: jwt.sign({ userId: user.id, login }, JWT_SECRET_KEY) };
    }
  }
  throw new Forbidden();
};

module.exports = { authenticate };
