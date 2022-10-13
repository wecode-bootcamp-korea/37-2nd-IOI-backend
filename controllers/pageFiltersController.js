const { query } = require('express')
const { pageFiltersService } = require('../services')
const { asyncWrap }  = require('../middleware/errorControl')

const pageFilter = asyncWrap (async (req, res) => {
  const { mainCategory, subCategory, sort, limit, offset } = req.query;

  if (!limit || !offset) {
    const err = new Error('QUERYSTRING_OMITTED');
    err.statusCode = 400;

    throw err
  }

    const getFilter = await pageFiltersService.pageFilter(mainCategory, subCategory, sort, parseInt(limit), parseInt(offset))
    res.status(201).json({ getFilter })

})


module.exports = {
  pageFilter,
}