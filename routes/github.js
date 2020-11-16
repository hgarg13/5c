const express = require('express');
const router = express.Router();
const db = require('../queries');

router.post('/', db.upsertRepo);

router.get('/:id', db.getRepo);

module.exports = router;
