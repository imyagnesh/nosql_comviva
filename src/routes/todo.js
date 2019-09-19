const express = require('express');
const { todList, addTodo } = require('../controllers/todoController');

const router = express.Router();

router.get('/', todList);

router.get('/:id', (req, res) => res.status(200).json(req.params.id));

router.post('/', addTodo);

router.put('/:id', (req, res) => res.status(200).json(req.body));

router.delete('/:id', (req, res) => res.status(200).json(req.body));

module.exports = router;
