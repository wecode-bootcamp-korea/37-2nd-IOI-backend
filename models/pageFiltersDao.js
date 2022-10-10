const appDataSource = require('./dataSource')

const subCategoryFilter = async (subCate, limit, offset) => {

	const result = await appDataSource.query(`
	SELECT
    mainCate.category as mainCategory,
    subCate.category as subCategory,
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
  WHERE subCate.id=?
    ORDER BY classes.like_count DESC, classes.name ASC
  LIMIT ? OFFSET ?;` ,[subCate, limit, offset]
)

return result
}

module.exports = {
	subCategoryFilter,
}