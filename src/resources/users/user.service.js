const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getById = userId => usersRepo.getById(userId);
const add = (name, login, password) => usersRepo.add(name, login, password);
const update = (userId, name, login, password) =>
  usersRepo.update(userId, name, login, password);
const del = userId => usersRepo.del(userId);

module.exports = { getAll, getById, add, update, del };
