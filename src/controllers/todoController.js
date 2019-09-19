const db = require('../db');

const collection = 'todo';

const handleError = error => {
  return {
    status: error.status || 'INVALID_REQUEST',
    error_message: error.message,
  };
};

exports.todList = async function(_, res) {
  try {
    const allTodos = await db
      .getDB()
      .collection(collection)
      .find({})
      .toArray();
    return res.status(200).json({ result: allTodos, status: 'OK' });
  } catch (err) {
    return res.status(404).send(handleError(err));
  }
};

exports.addTodo = async function(req, res) {
  try {
    const todo = await db
      .getDB()
      .collection(collection)
      .insertOne(req.body);
    return res.status(200).json({ result: todo.ops[0], status: 'OK' });
  } catch (error) {
    return res.status(404).send(handleError(error));
  }
};
