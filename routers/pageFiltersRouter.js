const express = require('express');

const { pageFiltersController } = require('../controllers');

const router = express.Router();  

router.get('/cost/high', pageFiltersController.costHighFilter)
router.get('/cost/low', pageFiltersController.costLowFilter)
router.get('/like/high', pageFiltersController.likeHighFilter)

module.exports = router;