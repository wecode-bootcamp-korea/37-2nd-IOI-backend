const { classesDao } = require('../models')

const getclass = async (classId) => {
    return await classesDao.getclass(classId)
}

module.exports = {
    getclass
}