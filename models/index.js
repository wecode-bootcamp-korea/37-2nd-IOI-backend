const userDao = require("./userDao")
const appDataSource = require('./dataSource')
const pageFiltersDao = require('./pageFiltersDao')
const classesDao = require('./classesDao')
const likesDao = require('./likesDao.js')
const videoDao = require("./videoDao");

module.exports = {
    userDao,
    appDataSource,
    pageFiltersDao,
    classesDao,
    likesDao,
    videoDao
}