const express = require('express');
const {
  todList,
  addTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

const router = express.Router();

router.get('/', todList);

router.get('/:id', getTodo);

router.post('/', addTodo);

router.put('/:id', updateTodo);

router.delete('/:id', deleteTodo);

module.exports = router;
