'use strict';

const express = require('express');
const cors = require('cors');

const urls = require('../controllers/urls');

const router = express.Router();

router.post('/shorturl/new', cors(), urls.create);
router.get('/shorturl/:id(\\d+)', cors(), urls.get);
router.get('/shorturl/*', cors(), (req, res) => res.status(404).json({
  error: 'Not Found',
  status: 404,
}));

module.exports = router;
