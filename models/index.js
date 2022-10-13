const userDao = require("./userDao")
const appDataSource = require('./dataSource')
const pageFiltersDao = require('./pageFiltersDao')
const classesDao = require('./classesDao')
const videoDao = require("./videoDao");

module.exports = {
    userDao,
    appDataSource,
    classesDao,
    pageFiltersDao,
    videoDao,
}