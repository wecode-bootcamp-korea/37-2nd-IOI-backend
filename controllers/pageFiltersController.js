const { query } = require('express')
const { pageFiltersService } = require('../services')
const { asyncWrap }  = require('../middleware/errorControl')

const subCategoryFilter = asyncWrap (async (req, res) => {
  const { subCate, limit, offset } = req.query;
  
  if (!limit || !offset) {
    const err = new Error('QUERYSTRING_OMITTED');
    err.statusCode = 400;
    
    throw err;
  }

	const getFilter = await pageFiltersService.subCategoryFilter(parseInt(subCate), parseInt(limit), parseInt(offset))

	res.status(201).json({ getFilter })
})

module.exports = {
  subCategoryFilter,
}