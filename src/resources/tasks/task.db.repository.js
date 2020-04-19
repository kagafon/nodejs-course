const Task = require('./task.model');

const getAllByBoardId = async boardId => {
  return await Task.find({ boardId });
};

const getById = async (boardId, _id) => {
  return await Task.findOne({ boardId, _id });
};

const add = async (title, order, description, userId, boardId, columnId) => {
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  await newTask.save();
  return newTask;
};

const update = async (boardId, _id, newValues) => {
  const foundTask = Task.findOne({ boardId, _id });
  if (foundTask) {
    foundTask.update(newValues);
  }
  return foundTask;
};

const del = async (boardId, _id) => {
  const foundTask = Task.findOne({ boardId, _id });
  if (foundTask) {
    foundTask.remove();
    return foundTask;
  }
  return false;
};

const deleteByBoardId = async boardId => {
  await Task.deleteMany({ boardId });
};

const resetUser = async userId => {
  await Task.updateMany({ userId }, { userId: null });
};

module.exports = {
  getAllByBoardId,
  getById,
  add,
  update,
  del,
  deleteByBoardId,
  resetUser
};
