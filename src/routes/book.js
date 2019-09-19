const express = require('express');
const { bookList } = require('../controllers/todoController');

const router = express.Router();

router.get('/', bookList);
