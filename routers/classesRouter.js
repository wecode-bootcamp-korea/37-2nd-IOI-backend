const express = require('express');
const { classesController } = require('../controllers');
const { upload } = require('../middleware/multer')
const  accessToken  = require('../middleware/auth')

const router = express.Router();

router.get('/detail/:classId', classesController.getClass)
router.post('/class', upload.fields([{name:'coverImage'},{name:'coverGallery'}]), accessToken, classesController.createClass)
router.get('/admin/:classId', classesController.adminClass)
router.get('', accessToken, classesController.getAllcreateClass)

module.exports = router;        



