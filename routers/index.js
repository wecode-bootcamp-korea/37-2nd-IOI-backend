const express = require("express");
const router = express.Router();
const pageFiltersRouter = require('./pageFiltersRouter');

const userRouter = require("./userRouter")
const classesRouter = require("./classesRouter")

router.use("/auth", userRouter)
router.use('/main', pageFiltersRouter);
router.use("/classes", classesRouter)

module.exports = router