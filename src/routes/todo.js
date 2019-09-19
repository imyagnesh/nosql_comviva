const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.status(200).json('Test api'));

router.get('/:id', (req, res) => res.status(200).json(req.params.id));

router.post('/', (req, res) => res.status(200).json(req.body));

module.exports = router;
