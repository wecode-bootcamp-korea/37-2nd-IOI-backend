const { query } = require('express')
const { pageFiltersService } = require('../services')
const { asyncWrap }  = require('../middleware/errorControl')

const getMainFilter = asyncWrap(async (req, res) => {
  const { limit, offset } = req.query;
	
  if (!limit || !offset) {
    const err = new Error('QUERYSTRING_OMITTED');
    err.statusCode = 400;

    throw err;
  }

	const getFilter = await pageFiltersService.getMainFilter(parseInt(limit), parseInt(offset))

	res.status(201).json({ getFilter })
})

module.exports = {
  getMainFilter,
}