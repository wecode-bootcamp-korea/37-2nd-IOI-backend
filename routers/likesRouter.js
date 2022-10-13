const express = require('express');
const { likesController }  = require('../controllers');
const accessToken = require('../middleware/auth.js');

const router = express.Router();

router.delete('/:classId', accessToken, likesController.deleteLike);
router.get('/getList', accessToken, likesController.getLikeList)
router.post('/:classId', accessToken, likesController.inputLike);

module.exports = router;