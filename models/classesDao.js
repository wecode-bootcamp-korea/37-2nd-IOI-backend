const appDataSource = require('./dataSource')

const getClass = async (classId) => {
  const [result] = await appDataSource.query(`
    SELECT
      c.id AS classId,
      c.name AS classTitle,
      c.price,
      s.category AS subCategory,
      c.thumbnail_image AS coverImage,
      c.created_at,
      JSON_ARRAYAGG(di.image_url) AS coverGallery,
      cl.level AS classLevel,
      c.like_count,
      c.discription AS classIntroduce,
      c.content,
      u.name AS creatorName,
      c.about_creater,
      u.profile_image
     FROM classes c 
     LEFT join detail_images di
      on c.id = di.class_id
     join class_level cl
      on c.level_id = cl.id
     join users u
      on c.user_id = u.id
     join sub_categories s
      on c.sub_category_id = s.id  
     WHERE c.id = ?`, [classId]
  )
  
  if(typeof result.coverGallery == "string"){
    result.coverGallery = result.coverGallery.replace("[",'');
    result.coverGallery = result.coverGallery.replace("]",'');
    result.coverGallery = result.coverGallery.replace(/"/g,'');
    result.coverGallery = result.coverGallery.replace(/ /g,'');
    result.coverGallery = result.coverGallery.split(",");
  }
  return result
}

  const adminClass = async (classId) => {
    const [result] = await appDataSource.query(`
      SELECT
      c.id AS classId,
      c.name AS classTitle,
      c.price,
      s.category AS subCategory,
      c.thumbnail_image AS coverImage,
      c.created_at,
      JSON_ARRAYAGG(di.image_url) AS coverGallery,
      m.category AS mainCategory,
      cl.level AS classLevel,
      c.like_count,
      c.discription AS categoryDetail,
      c.content AS classIntroduce,
      u.name AS creatorName,
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
     join main_categories m
      on s.main_category_id = m.id  
     WHERE c.id = ?
        `, [classId]
    )
    
    if(typeof result.coverGallery == "string"){
      result.coverGallery = result.coverGallery.replace("[",'');
      result.coverGallery = result.coverGallery.replace("]",'');
      result.coverGallery = result.coverGallery.replace(/"/g,'');
      result.coverGallery = result.coverGallery.replace(/ /g,'');
      result.coverGallery = result.coverGallery.split(",");
    }
    return result
  }

  const createClass = async (coverImage, classTitle, subCategory, categoryDetail, classLevel, classIntroduce, userId) => {
    const result = await appDataSource.query(`
      INSERT INTO classes (
        thumbnail_image,
        name,
        sub_category_id,
        discription,
        level_id,
        content,
        user_id
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )`, [coverImage, classTitle, subCategory, categoryDetail, classLevel, classIntroduce, userId]
    )
  
    return result.insertId
  }

  const createImage = async (detail_images, classId) => {
    
    const setData = detail_images.map(image => `("${image}", ${classId})`)
    const setList = setData.join(',')

    const result = await appDataSource.query(`
      INSERT INTO detail_images (
        image_url,
        class_id
      ) VALUES ${setList} 
      `
    )
    return result
  }

 const getAllcreateClass = async (userId) => {
  
   const result = await appDataSource.query(`
    SELECT
      c.thumbnail_image AS coverImage,
      c.name AS classTitle,
      c.id AS classId,
      c.created_at AS createdAt,
      u.id AS userId,
      s.category AS subCategory,
      m.category AS mainCategory
      from classes c
       join users u
        on c.user_id = u.id
       join sub_categories s
        on c.sub_category_id = s.id
       join main_categories m
        on s.main_category_id = m.id
      WHERE u.id = ?`
       , [userId]
       )
        return result
 };


module.exports = {
   getClass,
   createClass,
   adminClass,
   createImage,
   getAllcreateClass
}