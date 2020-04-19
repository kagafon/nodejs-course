const Board = require('./board.model');
const Column = require('./column.model');
const tasksRepo = require('../tasks/task.db.repository');

const getAll = async () => {
  return await Board.find({}).populate({ path: 'columns' });
};

const getById = async boardId => {
  return await Board.findById(boardId).populate({ path: 'columns' });
};

const add = async (title, columnsArray) => {
  const board = new Board({ title, columns: [] });

  columnsArray.forEach(x => {
    const newColumn = new Column({ ...x, boardId: board._id });
    board.columns.push(newColumn);
    //    newColumn.board = board;
    newColumn.save();
  });
  await board.save();
  return board;
};

const update = async (boardId, title, columnsArray) => {
  const board = await getById(boardId);

  if (board) {
    board.title = title;

    board.columns.forEach(async x => {
      const column = columnsArray.find(y => y.id === x._id);
      if (column) {
        x.update({ title: column.title, order: column.order });
      }
    });
    await board.save();
    return board;
  }
  return null;
};

const del = async boardId => {
  const board = await getById(boardId);
  if (board) {
    board.columns.forEach(x => x.remove());
    await tasksRepo.deleteByBoardId(boardId);
    await board.remove();
    return board;
  }
  return false;
};

module.exports = { getAll, getById, add, update, del };
