const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    res.json(await tasksService.getAllByBoardId(req.params.boardId));
  })
  .post(async (req, res) => {
    const { title, order, description, userId, columnId } = req.body;
    res.json(
      await tasksService.add(
        title,
        order,
        description,
        userId,
        req.params.boardId,
        columnId
      )
    );
  });

router
  .route('/:taskId')
  .get(async (req, res) => {
    const task = await tasksService.getById(
      req.params.boardId,
      req.params.taskId
    );
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Not found.');
    }
  })
  .put(async (req, res) => {
    const { title, order, description, userId, boardId, columnId } = req.body;
    const task = await tasksService.update(
      req.params.boardId,
      req.params.taskId,
      {
        title,
        order,
        description,
        userId,
        boardId,
        columnId
      }
    );
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Not found.');
    }
  })
  .delete(async (req, res) => {
    const deletedtask = await tasksService.del(
      req.params.boardId,
      req.params.taskId
    );
    if (deletedtask) {
      res.status(204).json(deletedtask);
    } else {
      res.status(404).send('Not found.');
    }
  });

module.exports = router;
