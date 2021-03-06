const usersRepo = require('./user.db.repository');
const { validateId, checkExistence } = require('../../common/utils');

const getAll = async () => {
  return await usersRepo.getAll();
};

const getById = async userId => {
  return await checkExistence(usersRepo.getById, 'User', validateId(userId));
};

const add = async (name, login, password) => {
  return await usersRepo.add(name, login, password);
};

const update = async (userId, name, login, password) => {
  return await checkExistence(
    usersRepo.update,
    'User',
    validateId(userId),
    name,
    login,
    password
  );
};

const del = async userId => {
  return await checkExistence(usersRepo.del, 'User', validateId(userId));
};

const getByLogin = async login => {
  return await usersRepo.getByLogin(login);
};

module.exports = { getAll, getById, add, update, del, getByLogin };
