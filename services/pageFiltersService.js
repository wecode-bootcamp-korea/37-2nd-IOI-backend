const { pageFiltersDao } = require('../models')

const pageFilter = async (mainCategory, subCategory, sort, limit, offset) => {

  return await pageFiltersDao.pageFilter(mainCategory, subCategory, sort, limit, offset)
}

module.exports = {
  pageFilter,
}