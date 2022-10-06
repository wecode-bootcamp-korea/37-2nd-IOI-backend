const { classesService } = require('../services')
const { asyncWrap }  = require('../middleware/errorControl')

const getClass = asyncWrap(async (req, res) => {
    
    const classId = req.params.classId;
    
    const classes = await classesService.getClass(classId)

    res.status(200).json({ classes })
})

const adminClass = asyncWrap(async (req, res) => {
    
    const classId = req.params.classId;
    
    const classes = await classesService.adminClass(classId)

    res.status(200).json({ classes })
})

const createClass = asyncWrap(async (req, res) => {
    const userId = req.userId
    const coverImage = req.files.coverImage[0].location
    const coverGallery = req.files.coverGallery.map(gallery => gallery.location)
    const {classTitle, subCategory, categoryDetail, classLevel, classIntroduce} = req.body
    await classesService.createClass(coverImage, coverGallery, classTitle, subCategory, categoryDetail, classLevel, classIntroduce, userId)
    return res.status(200).json({ message: "SUCCESS" })
})

const getAllcreateClass = asyncWrap(async (req, res) => {
    const userId = req.userId
    const classes = await classesService.getAllcreateClass(userId);
    
    return res.status(200).json({ classes });
})

module.exports = {
    getClass,
    adminClass,
    createClass,
    getAllcreateClass
}