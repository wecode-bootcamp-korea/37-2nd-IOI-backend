const { pageFiltersDao } = require('../models')

const getMainFilter = async (limit, offset) => {
	console.log(limit)
	console.log(offset)
	return await pageFiltersDao.getMainFilter(limit, offset)
}

module.exports = {
  getMainFilter,
}