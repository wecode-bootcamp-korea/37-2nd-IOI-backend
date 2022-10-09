const appDataSource = require('./dataSource')

const inputLike = async (userId, classId) => {
    return await appDataSource.query(`
    INSERT INTO likes (
      user_id, class_id
      ) VALUES (
              ?,
              ?
      )`,
  [userId, classId]
    )
}

const increseLike = async (classId) => {
  let increseLike = await appDataSource.query(
    `UPDATE
      classes
      SET like_count = like_count + 1
      WHERE id = ?`,
      [classId]
  )
     return increseLike;
}

const decreseLike = async (classId) => {
  let decreseLike = await appDataSource.query(
    `UPDATE
       classes
       SET like_count = like_count -1
       WHERE id = ?`,
       [classId]
  )
      return decreseLike;
}

const getLikeList = async (userId) => {

	return await appDataSource.query(`
	  SELECT 
		  c.id as classId,
      c.name as className, 
		  c.price,
		  c.thumbnail_image,
      c.like_count,
      u.name as creator
      FROM 
		  classes c  
	  JOIN likes l
      ON c.id = l.class_id
    JOIN users u
      ON c.user_id = u.id   
	  WHERE l.user_id = ?`,
		  [userId]
	)
  }

const checkLike = async (userId, classId) => {

    const [doesExist] = await appDataSource.query(`
    SELECT EXISTS(
        SELECT 
            id
        FROM 
            likes 
        WHERE 
            user_id = ? AND
            class_id = ?) AS boolean`,
    [userId, classId]
  )
  return doesExist.boolean;
    } 

    const twocheckLike = async (userId, classId) => {

      const [doesExist] = await appDataSource.query(`
      SELECT EXISTS(
          SELECT 
              id
          FROM 
              likes 
          WHERE 
              user_id = ? AND
              class_id = ?) AS boolean`,
      [userId, classId]
    )
    return doesExist.boolean;
      }

const deleteLike = async (userId, classId) => {

	return await appDataSource.query(`
	DELETE FROM 
		likes
	WHERE 
		user_id= ? AND
		class_id in (?)`, 
		[userId, classId]
	)

}

module.exports = {
    inputLike,
    increseLike,
    decreseLike,
    getLikeList,
    checkLike,
    twocheckLike,
    deleteLike
}