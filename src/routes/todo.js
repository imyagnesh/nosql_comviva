const express = require('express');

const router = express.Router();

router.get('/', (req, res) =>
  res
    .status(200)
    .json(
      'Test api lkahsdfjk lkasdjflkdsj lksjdfkljasdfjklasd lkjsadlkfjadsklf lkjslkfjasdf lkjasdf',
    ),
);

router.get('/:id', (req, res) => res.status(200).json(req.params.id));

router.post('/', (req, res) => res.status(200).json(req.body));

module.exports = router;
