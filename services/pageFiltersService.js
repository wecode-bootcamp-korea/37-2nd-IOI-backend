const { pageFiltersDao } = require('../models')

const categoryFilter = async (mainCate, limit, offset) => {

	return await pageFiltersDao.categoryFilter(mainCate, limit, offset)
}

module.exports = {
  categoryFilter,
}