const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter")
const pageFiltersRouter = require('./pageFiltersRouter');
const classesRouter = require("./classesRouter")
const likesRouter = require('./likesRouter');
const videoRouter = require("./videoRouter");
const reviewRouter = require("./reviewRouter");

router.use("/auth", userRouter)
router.use('/main', pageFiltersRouter);
router.use("/classes", classesRouter)
router.use('/likes', likesRouter);
router.use("/video", videoRouter);
router.use('/review', reviewRouter);


module.exports = router;