const appDataSource = require('./dataSource')

const getclass = async (classId) => {
    const result = await appDataSource.query(`
      SELECT
        c.id,
        c.name,
        c.price,
        s.category AS category_Name,
        c.thumbnail_image,
        c.created_at,
        JSON_ARRAYAGG(di.image_url) AS sub_images,
        cl.level AS class_level,
        c.like_count,
        c.discription,
        c.content,
        u.name,
        c.about_creater,
        u.profile_image
       FROM classes c 
       join detail_images di
        on c.id = di.class_id
       join class_level cl
        on c.level_id = cl.id
       join users u
        on c.user_id = u.id
       join sub_categories s
        on c.sub_category_id = s.id 
       WHERE c.id = ?`, [classId]
    )
    return result [0]
  }

module.exports = {
   getclass
}