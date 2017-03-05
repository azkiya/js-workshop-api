const low = require('lowdb');

const db = low();

const initialData = {
  tasks: [],
};

db.defaults(initialData).write();

function save(taskName) {
  db.get('tasks')
    .push(taskName)
    .write();
}

function get() {
  return db.get('tasks').value();
}

function remove(nth) {
  db.get('tasks')
    .remove((task, n) => n === nth-1)
    .write();
};

module.exports = {
  save,
  get,
  remove,
};
