const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const { OK, NO_CONTENT } = require('http-status-codes');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const retValue = await tasksService.getAllByBoardId(req.params.boardId);
      res.status(OK).json(retValue);
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    const { title, order, description, userId, columnId } = req.body;
    try {
      res
        .status(OK)
        .json(
          await tasksService.add(
            title,
            order,
            description,
            userId,
            req.params.boardId,
            columnId
          )
        );
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:taskId')
  .get(async (req, res, next) => {
    try {
      res
        .status(OK)
        .json(
          await tasksService.getById(req.params.boardId, req.params.taskId)
        );
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    const { title, order, description, userId, boardId, columnId } = req.body;
    try {
      res.status(OK).json(
        await tasksService.update(req.params.boardId, req.params.taskId, {
          title,
          order,
          description,
          userId,
          boardId,
          columnId
        })
      );
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      res
        .status(NO_CONTENT)
        .json(await tasksService.del(req.params.boardId, req.params.taskId));
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
