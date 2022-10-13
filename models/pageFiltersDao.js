const appDataSource = require('./dataSource')

const pageFilter = async (mainCategory, subCategory, sort, limit, offset) => {

  const filterMainCate = (mainCategory) ? (`where mainCate.id = ${mainCategory}`) : "";
  const filterSubCate = (subCategory) ? (`where subCate.id = ${subCategory}`) : "";


    function orderBy (sortCondition){
      let result = `classes.like_count DESC, classes.name ASC`
      
      const sortSet = {
        costHigh : `classes.price DESC`,
        costLow : `classes.price ASC`,
        likeHigh : `classes.like_count DESC`
      } 
      
      if (sortCondition){
        result = sortSet[sortCondition]
      }

      return result
        
    }

  

  const result = await appDataSource.query(`
  SELECT
    mainCate.category as mainCate,
    subCate.category as subCate,
    classes.thumbnail_image,
    u.name as creatorName,
    classes.name as classTitle,
    classes.like_count,
    classes.price
  From classes
  JOIN sub_categories subCate
    ON subCate.id=classes.sub_category_id
  JOIN main_categories mainCate
    ON mainCate.id=subCate.main_Category_id
  JOIN users u
    ON classes.user_id=u.id
    ${filterMainCate}
    ${filterSubCate}
  ORDER BY ${orderBy(sort)}  
  LIMIT ? OFFSET ?;`,[limit, offset]
)

return result
}

module.exports = {
  pageFilter,
}