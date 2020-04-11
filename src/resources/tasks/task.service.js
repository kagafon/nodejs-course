const tasksRepo = require('./task.memory.repository');
const { validateId, checkExistence } = require('../../common/utils');

const getAllByBoardId = async boardId => {
  return await tasksRepo.getAllByBoardId(validateId(boardId));
};

const getById = async (boardId, taskId) => {
  return await checkExistence(
    tasksRepo.getById,
    'Task',
    validateId(boardId),
    validateId(taskId)
  );
};

const add = async (title, order, description, userId, boardId, columnId) => {
  return await tasksRepo.add(
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  );
};

const update = async (searchBoardId, taskId, newValues) => {
  return await checkExistence(
    tasksRepo.update,
    'Task',
    validateId(searchBoardId),
    validateId(taskId),
    newValues
  );
};
const del = async (boardId, taskId) => {
  return await checkExistence(
    tasksRepo.del,
    'Task',
    validateId(boardId),
    validateId(taskId)
  );
};

module.exports = { getAllByBoardId, getById, add, update, del };
