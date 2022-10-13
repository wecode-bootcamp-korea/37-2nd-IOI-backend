const express = require('express');

const { pageFiltersController } = require('../controllers');

const router = express.Router();

router.get('', pageFiltersController.pageFilter);

module.exports = router;