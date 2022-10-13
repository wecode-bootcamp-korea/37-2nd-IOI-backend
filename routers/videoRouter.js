const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const accessToken = require("../middleware/auth");

const { videoController } = require("../controllers");

router.get("/:classId", accessToken, videoController.getVideo);
router.post("", upload.single("video"), accessToken, videoController.postVideo);
router.patch("", upload.single("video"), accessToken, videoController.editVideo);
router.delete("", accessToken, videoController.deleteVideo);

module.exports = router