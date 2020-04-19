const tasksRepo = require('../tasks/task.db.repository');
const { User } = require('./user.model');

const getAll = async () => {
  console.log(User);
  return await User.find({});
};

const getById = async userId => {
  return await User.findById(userId);
};

const add = async (name, login, password) => {
  const newUser = new User({ name, login, password });
  await newUser.save();
  return newUser;
};

const update = async (userId, name, login, password) => {
  const foundUser = await User.findById(userId);
  if (foundUser) {
    foundUser.name = name;
    foundUser.login = login;
    foundUser.password = password;
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

module.exports = { getAll, getById, add, update, del };
