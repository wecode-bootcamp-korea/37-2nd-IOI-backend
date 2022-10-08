const { query } = require('express')
const { pageFiltersService } = require('../services')
const { asyncWrap }  = require('../middleware/errorControl')

const categoryFilter = asyncWrap (async (req, res) => {

  const { mainCate, limit, offset } = req.query;

  if (!limit || !offset) {
    const err = new Error('QUERYSTRING_OMITTED');
    err.statusCode = 400;

    throw err;
  }
	const getFilter = await pageFiltersService.categoryFilter(mainCate, parseInt(limit), parseInt(offset))

	res.status(201).json({ getFilter })
})

module.exports = {
  categoryFilter,
}