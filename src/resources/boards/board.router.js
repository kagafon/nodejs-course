const router = require('express').Router();
const boardsService = require('./board.service');
const tasksRouter = require('../tasks/task.router');
const { OK, NO_CONTENT } = require('http-status-codes');
router
  .route('/')
  .get(async (req, res, next) => {
    try {
      res.status(OK).json(await boardsService.getAll());
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    const { title, columns } = req.body;
    try {
      res.status(OK).json(await boardsService.add(title, columns));
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:boardId')
  .get(async (req, res, next) => {
    try {
      res.status(OK).json(await boardsService.getById(req.params.boardId));
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    const { title, columns } = req.body;
    try {
      res
        .status(OK)
        .json(await boardsService.update(req.params.boardId, title, columns));
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      res.status(NO_CONTENT).json(await boardsService.del(req.params.boardId));
    } catch (err) {
      return next(err);
    }
  });
router.use('/:boardId/tasks', tasksRouter);

module.exports = router;
