const tasksRepo = require('../tasks/task.memory.repository');
const User = require('./user.model');
const usersStorage = [
  new User({
    id: '69fe4ab3-8030-43d6-95c5-4f91110473ab',
    name: 'test',
    login: 'test',
    password: 'asljbadfjkbd'
  }),
  new User({
    id: '69fe4ab3-8030-43d6-95c5-4f9ea50473ab',
    name: 'user',
    login: 'user12sdfsdfs3',
    password: 'asljbadfjkbdasdasd'
  })
];

const getAll = async () => {
  return usersStorage;
};

const getById = async userId => {
  return usersStorage.find(x => x.id === userId);
};

const add = async (name, login, password) => {
  const newUser = new User({ name, login, password });
  usersStorage.push(newUser);
  return newUser;
};

const update = async (userId, name, login, password) => {
  const foundUser = usersStorage.find(x => x.id === userId);
  if (foundUser) {
    Object.assign(foundUser, { name, login, password });
    foundUser.name = name !== undefined ? name : foundUser.name;
    foundUser.login = login !== undefined ? login : foundUser.login;
    foundUser.password = password !== undefined ? password : foundUser.password;
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
