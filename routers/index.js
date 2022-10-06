const express = require("express");
const router = express.Router();
const classesRouter = require('./classesRouter');

router.use('/classes', classesRouter);

module.exports = router;