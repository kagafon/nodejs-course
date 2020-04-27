const tasksRepo = require('../tasks/task.db.repository');
const { User } = require('./user.model');
const bcrypt = require('bcrypt');

const getAll = async () => {
  return await User.find({});
};

const getById = async userId => {
  return await User.findById(userId);
};

const add = async (name, login, password) => {
  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ name, login, password: hash });
  await newUser.save();
  return newUser;
};

const update = async (userId, name, login, password) => {
  const foundUser = await User.findById(userId);
  if (foundUser) {
    const hash = await bcrypt.hash(password, 10);
    foundUser.name = name;
    foundUser.login = login;
    foundUser.password = hash;
    await foundUser.save();
    return foundUser;
  }
  return null;
};

const del = async userId => {
  const foundUser = await User.findById(userId);
  if (foundUser) {
    await foundUser.remove();
    await tasksRepo.resetUser(userId);
    return foundUser;
  }
  return false;
};

const getByLogin = async login => {
  return await User.findOne({ login });
};

module.exports = { getAll, getById, add, update, del, getByLogin };
