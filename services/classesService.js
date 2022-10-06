const { classesDao } = require('../models')

const getClass = async (classId) => {
    return await classesDao.getClass(classId)
}

const adminClass = async (classId) => {
    return await classesDao.adminClass(classId)
}

const createClass = async (coverImage, coverGallery, classTitle, subCategory, categoryDetail, classLevel, classIntroduce, userId) => {
    const classId = await classesDao.createClass(coverImage, classTitle, subCategory, categoryDetail, classLevel, classIntroduce, userId) 
    return await classesDao.createImage(coverGallery, classId)
}

const getAllcreateClass = async (userId) => {
    return await classesDao.getAllcreateClass(userId)
}

module.exports = {
    getClass,
    adminClass,
    createClass,
    getAllcreateClass
}