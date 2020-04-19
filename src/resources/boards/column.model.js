const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuid },
    title: { type: String, default: 'Default column' },
    order: { type: Number, default: 0 },
    boardId: String
  },
  { versionKey: false }
);

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
