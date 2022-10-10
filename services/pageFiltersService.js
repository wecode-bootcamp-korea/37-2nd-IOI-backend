const { pageFiltersDao } = require('../models')

const subCategoryFilter = async (subCate, limit, offset) => {

	return await pageFiltersDao.subCategoryFilter(subCate, limit, offset)
}

module.exports = {
  subCategoryFilter,
}