const { pageFiltersDao } = require('../models')

const getMainFilter = async (limit, offset) => {

	return await pageFiltersDao.getMainFilter(limit, offset)
}

module.exports = {
  getMainFilter,
}