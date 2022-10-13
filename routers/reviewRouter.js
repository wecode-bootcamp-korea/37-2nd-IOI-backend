const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const accessToken = require("../middleware/auth")

const { reviewController } = require("../controllers")

router.get("/:classId", reviewController.getReview);
router.post("", upload.single("image"), accessToken, reviewController.postReview);
router.patch("", upload.single("image"), accessToken, reviewController.editReview);
router.delete("", accessToken, reviewController.deleteReview);

module.exports = router