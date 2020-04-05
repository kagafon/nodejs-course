const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getById = boardId => boardsRepo.getById(boardId);
const add = (title, columns) => boardsRepo.add(title, columns);
const update = (boardId, title, columns) =>
  boardsRepo.update(boardId, title, columns);
const del = boardId => boardsRepo.del(boardId);

module.exports = { getAll, getById, add, update, del };
