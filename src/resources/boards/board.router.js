const router = require('express').Router();
const boardsService = require('./board.service');
const tasksRouter = require('../tasks/task.router');
router
  .route('/')
  .get(async (req, res) => {
    res.json(await boardsService.getAll());
  })
  .post(async (req, res) => {
    const { title, columns } = req.body;
    res.json(await boardsService.add(title, columns));
  });

router
  .route('/:boardId')
  .get(async (req, res) => {
    const board = await boardsService.getById(req.params.boardId);
    if (board) {
      res.json(board);
    } else {
      res.status(404).send('Not found.');
    }
  })
  .put(async (req, res) => {
    const { title, columns } = req.body;
    const board = await boardsService.update(
      req.params.boardId,
      title,
      columns
    );
    if (board) {
      res.json(board);
    } else {
      res.status(404).send('Not found.');
    }
  })
  .delete(async (req, res) => {
    const deletedBoard = await boardsService.del(req.params.boardId);
    if (deletedBoard) {
      res.status(204).json(deletedBoard);
    } else {
      res.status(404).send('Not found.');
    }
  });
router.use('/:boardId/tasks', tasksRouter);

module.exports = router;
