const appDataSource = require('./dataSource')

const categoryFilter = async (mainCate, limit, offset) => {

	const result = await appDataSource.query(`
	SELECT
      mainCate.category as mainCategory,
      subCate.category as subCategory,
      classes.thumbnail_image,
      u.name,
      classes.name as classTitle,
      classes.like_count,
      classes.price
  FROM classes
  JOIN sub_categories subCate
    ON subCate.id=classes.sub_category_id
  JOIN main_categories mainCate
    ON mainCate.id=subCate.main_category_id
  JOIN users u
    ON classes.user_id=u.id
    WHERE mainCate.id = ?
    ORDER BY classes.like_count DESC, classes.name ASC
    LIMIT ? 
    OFFSET ?;`,[mainCate, limit, offset]
)

return result
}

module.exports = {
	categoryFilter,
}