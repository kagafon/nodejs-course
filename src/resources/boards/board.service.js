const boardsRepo = require('./board.memory.repository');
const { validateId, checkExistence } = require('../../common/utils');

const getAll = () => {
  return boardsRepo.getAll();
};

const getById = async boardId => {
  return await checkExistence(boardsRepo.getById, 'Board', validateId(boardId));
};

const add = async (title, columns) => {
  return await boardsRepo.add(title, columns);
};

const update = async (boardId, title, columns) => {
  return await checkExistence(
    boardsRepo.update,
    'Board',
    validateId(boardId),
    title,
    columns
  );
};

const del = async boardId => {
  return await checkExistence(boardsRepo.del, 'Board', validateId(boardId));
};

module.exports = { getAll, getById, add, update, del };
