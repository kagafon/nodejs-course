const tasksRepo = require('../tasks/task.memory.repository');
const User = require('./user.model');
const usersStorage = [];

const getAll = () => {
  return usersStorage;
};

const getById = userId => {
  return usersStorage.find(x => x.id === userId);
};

const add = (name, login, password) => {
  const newUser = new User({ name, login, password });
  usersStorage.push(newUser);
  return newUser;
};

const update = (userId, name, login, password) => {
  const foundUser = usersStorage.find(x => x.id === userId);
  if (foundUser) {
    Object.assign(foundUser, { name, login, password });
  }
  return foundUser;
};

const del = async userId => {
  const foundIdx = usersStorage.findIndex(x => x.id === userId);
  if (foundIdx >= 0) {
    await tasksRepo.resetUser(userId);
    return usersStorage.splice(foundIdx, 1);
  }
  return false;
};

module.exports = { getAll, getById, add, update, del };
