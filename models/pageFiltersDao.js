const appDataSource = require('./dataSource')

	const getMainFilter = async (limit, offset) => {
		const result = await appDataSource.query(`
		SELECT
			mainCate.category,
			subCate.category,
			classes.thumbnail_image,
			u.name,
			classes.name,
			classes.like_count,
			classes.price
		FROM classes
		JOIN users u 
			ON u.id=classes.user_id
		JOIN sub_categories subCate 
			ON subCate.id=classes.sub_category_id
		JOIN main_categories mainCate 
			ON mainCate.id=subCate.main_category_id
		ORDER BY classes.like_count DESC, classes.name ASC
		LIMIT ? 
		OFFSET ?;`,[limit, offset]
	)
	
	return result
}

module.exports = {
  getMainFilter,
}