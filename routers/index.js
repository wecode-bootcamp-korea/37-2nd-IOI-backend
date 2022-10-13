const express = require("express");
const router = express.Router();
const pageFiltersRouter = require('./pageFiltersRouter');

const userRouter = require("./userRouter")

router.use("/auth", userRouter)
router.use('/main', pageFiltersRouter);

module.exports = router