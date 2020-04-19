const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    title: { type: String, default: 'New task' },
    description: { type: String, default: 'New task description' },
    order: { type: Number, default: 0 },
    boardId: String,
    columnId: String,
    userId: String
  },
  { versionKey: false }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
