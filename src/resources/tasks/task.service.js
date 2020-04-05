const tasksRepo = require('./task.memory.repository');

const getAllByBoardId = boardId => tasksRepo.getAllByBoardId(boardId);
const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);
const add = (title, order, description, userId, boardId, columnId) =>
  tasksRepo.add(title, order, description, userId, boardId, columnId);
const update = (searchBoardId, taskId, newValues) =>
  tasksRepo.update(searchBoardId, taskId, newValues);
const del = (boardId, taskId) => tasksRepo.del(boardId, taskId);

module.exports = { getAllByBoardId, getById, add, update, del };
