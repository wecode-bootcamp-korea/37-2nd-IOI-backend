const express = require('express');

const { pageFiltersController } = require('../controllers');

const router = express.Router();

router.get('', pageFiltersController.categoryFilter)


module.exports = router;

