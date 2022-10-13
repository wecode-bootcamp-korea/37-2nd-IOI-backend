const appDataSource = require('./dataSource')

const pageFilter = async (mainCategory, subCategory, sort, limit, offset) => {

    function where (categoryMain, categorySub) {
      let result = ``
      
      const categorySet = {
        mainCategory : `mainCate.id = ${categoryMain}`,
        subCategory : `subCate.id = ${categorySub}`
      }
      
      if(categoryMain && categorySub){
        result = `WHERE ` + categorySet["mainCategory"] + ` and `+ categorySet["subCategory"]
      }
      else if(categoryMain) {
        result = `WHERE ` + categorySet["mainCategory"]
      }
      else if(categorySub) {
        result = `WHERE ` + categorySet["subCategory"]
      }
      
      return result
      
    }

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
    ${where(mainCategory, subCategory)}
  ORDER BY ${orderBy(sort)}  
  LIMIT ? OFFSET ?;`,[limit, offset]
)

return result
}

module.exports = {
  pageFilter,
}