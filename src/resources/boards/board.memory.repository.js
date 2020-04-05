const Board = require('./board.model');
const Column = require('./column.model');
const tasksRepo = require('../tasks/task.memory.repository');

const boardsStorage = [
  new Board({
    id: '69fe4ab3-8030-43d6-95c5-4f91110473ab',
    title: 'test'
  }),
  new Board({
    id: '69fe4ab3-8030-43d6-95c5-4f9ea50473ab',
    title: 'test1'
  })
];

const getAll = async () => {
  return boardsStorage;
};

const getById = async boardId => {
  return boardsStorage.find(x => x.id === boardId);
};

const add = async (title, columnsArray) => {
  const columns = columnsArray.map(x => new Column(x));
  const newboard = new Board({ title, columns });
  boardsStorage.push(newboard);
  return newboard;
};

const update = async (boardId, title, columnsArray) => {
  const foundBoard = boardsStorage.find(x => x.id === boardId);
  if (foundBoard) {
    foundBoard.title = title !== undefined ? title : foundBoard.title;
    // Do something with detaching columns here and look for exising columns
    foundBoard.columns = columnsArray.map(x => new Column(x));
  }
  return foundBoard;
};

const del = async boardId => {
  const foundIdx = boardsStorage.findIndex(x => x.id === boardId);
  if (foundIdx >= 0) {
    await tasksRepo.deleteByBoardId(boardId);
    // Do something with detached columns here
    return boardsStorage.splice(foundIdx, 1);
  }
  return false;
};

module.exports = { getAll, getById, add, update, del };
