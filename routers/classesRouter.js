const express = require('express');
const { classesController } = require('../controllers');
const router = express.Router();

router.get('/showclass/:classId', classesController.getclass)

module.exports = router;
