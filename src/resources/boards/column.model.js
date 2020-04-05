const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'Default board', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
