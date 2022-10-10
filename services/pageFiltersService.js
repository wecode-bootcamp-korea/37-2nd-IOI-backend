const { pageFiltersDao } = require('../models')

const mainCostHighFilter = async (mainCate, limit, offset) => {

  return await pageFiltersDao.mainCostHighFilter(mainCate, limit, offset)
}

const subCostHighFilter = async (subCate, limit, offset) => {

  return await pageFiltersDao.subCostHighFilter(subCate, limit, offset)
}

const mainCostLowhFilter = async (mainCate, limit, offset) => {

  return await pageFiltersDao.mainCostLowhFilter(mainCate, limit, offset)
}

const subCostLowFilter = async (subCate, limit, offset) => {

  return await pageFiltersDao.subCostLowFilter(subCate, limit, offset)
}

const mainLikeHighFilter = async (mainCate, limit, offset) => {

  return await pageFiltersDao.mainLikeHighFilter(mainCate, limit, offset)
}

const subLikeHighFilter = async (subCate, limit, offset) => {

  return await pageFiltersDao.subLikeHighFilter(subCate, limit, offset)
}

module.exports = {
  mainCostHighFilter,
  subCostHighFilter,
  mainCostLowhFilter,
  subCostLowFilter,
  mainLikeHighFilter,
  subLikeHighFilter,
}
