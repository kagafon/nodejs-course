const Task = require('./task.model');
const tasksStorage = [];

const getAllByBoardId = async boardId => {
  return tasksStorage.filter(x => x.boardId === boardId);
};

const getById = async (boardId, taskId) => {
  return tasksStorage.find(x => x.id === taskId && x.boardId === boardId);
};

const add = async (title, order, description, userId, boardId, columnId) => {
  const newtask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  tasksStorage.push(newtask);
  return newtask;
};

const update = async (searchBoardId, taskId, newValues) => {
  const foundTask = tasksStorage.find(
    x => x.id === taskId && x.boardId === searchBoardId
  );
  if (foundTask) {
    Object.assign(foundTask, newValues);
  }
  return foundTask;
};

const del = async (boardId, taskId) => {
  const foundIdx = tasksStorage.findIndex(
    x => x.id === taskId && x.boardId === boardId
  );
  if (foundIdx >= 0) {
    return tasksStorage.splice(foundIdx, 1);
  }
  return false;
};

const deleteByBoardId = async boardId => {
  let foundIdx = tasksStorage.findIndex(x => x.boardId === boardId);
  while (foundIdx > -1) {
    tasksStorage.splice(foundIdx, 1);
    foundIdx = tasksStorage.findIndex(x => x.boardId === boardId);
  }
};

const resetUser = async userId => {
  tasksStorage.filter(x => x.userId === userId).forEach(x => (x.userId = null));
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
