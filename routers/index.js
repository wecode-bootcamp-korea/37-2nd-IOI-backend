const express = require("express");
const router = express.Router();
const pageFiltersRouter = require('./pageFiltersRouter.js');

router.use('/main', pageFiltersRouter);

module.exports = router