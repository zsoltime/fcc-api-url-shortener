'use strict';

const express = require('express');

const api = require('./api');
const docs = require('./docs');

const router = express.Router();

router.use('/', docs);
router.use('/api', api);
router.get('*', (req, res) => {
  res.status(404).render('404');
});

module.exports = router;
