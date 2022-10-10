const { query } = require('express')
const { pageFiltersService } = require('../services')
const { asyncWrap }  = require('../middleware/errorControl')

const costHighFilter = asyncWrap (async (req, res) => {
  const { limit, offset } = req.query;
  const { mainCate, subCate } = req.query;

  if (!limit || !offset) {
    const err = new Error('QUERYSTRING_OMITTED');
    err.statusCode = 400;
    
    throw err;
  }

  if(mainCate){
    const getFilter = await pageFiltersService.mainCostHighFilter(mainCate, parseInt(limit), parseInt(offset))
    res.status(201).json({ getFilter })
  }
  else if(subCate){
    const getFilter = await pageFiltersService.subCostHighFilter(subCate, parseInt(limit), parseInt(offset))
    res.status(201).json({ getFilter })
  }

})

const costLowFilter = asyncWrap (async (req, res) => {
  const { limit, offset } = req.query;
  const { mainCate, subCate } = req.query;

  if (!limit || !offset) {
    const err = new Error('QUERYSTRING_OMITTED');
    err.statusCode = 400;
    
    throw err;
  }

  if(mainCate){
    const getFilter = await pageFiltersService.mainCostLowhFilter(mainCate, parseInt(limit), parseInt(offset))
    res.status(201).json({ getFilter })
  }
  else if(subCate){
    const getFilter = await pageFiltersService.subCostLowFilter(subCate, parseInt(limit), parseInt(offset))
    res.status(201).json({ getFilter })
  }

})

const likeHighFilter = asyncWrap (async (req, res) => {
  const { limit, offset } = req.query;
  const { mainCate, subCate } = req.query;

  if (!limit || !offset) {
    const err = new Error('QUERYSTRING_OMITTED');
    err.statusCode = 400;
    
    throw err;
  }

  if(mainCate){
    const getFilter = await pageFiltersService.mainLikeHighFilter(mainCate, parseInt(limit), parseInt(offset))
    res.status(201).json({ getFilter })
  }
  else if(subCate){
    const getFilter = await pageFiltersService.subLikeHighFilter(subCate, parseInt(limit), parseInt(offset))
    res.status(201).json({ getFilter })
  }

})

module.exports = {
  costHighFilter,
  costLowFilter,
  likeHighFilter,
}