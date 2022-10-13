const { reviewDao, classesDao } = require("../models")

const getReview = async ( classId, offset, limit ) => {
    const searchClass = await classesDao.getClass( classId );

    if( !searchClass ) {
        const err = new Error("INVALID_CLASS");
        err.statusCode = 406;
        throw err
    }

    return await reviewDao.getReview( classId, +offset, +limit )
}

const getReviewByUserId = async ( classId, userId ) => {
    const searchClass = await classesDao.getClass( classId, userId );

    if( !searchClass ) {
        const err = new Error("INVALID_CLASS");
        err.statusCode = 406;
        throw err
    }

    return await reviewDao.getReviewByUserId( classId, userId )
}

const postReview = async ( userId, classId, content, image ) => {
    const searchClass = await classesDao.getClass( classId );

    if( !searchClass ) {
        const err = new Error("INVALID_CALSS");
        err.statusCode = 406;
        throw err
    }

    const { review } = await reviewDao.getReviewByUserId( classId, userId );
    if ( +review ) {
        const err = new Error("Only one review can be created")
        err.statusCode = 403;
        throw err;
    }
    if ( image ) image = image.location;

    const { insertId } = await reviewDao.createReview( userId, classId, content )
    await reviewDao.createReviewImage( image, insertId )
}

const editReview = async (classId, reviewId, content, image ) => {
    const { review } = await reviewDao.checkReview( classId, reviewId );
    if ( review == 0 ) {
        const err = new Error("No reviews written")
        err.statusCode = 403;
        throw err
    } 

    if ( image ) image = image.location;
    const { image_url } = await reviewDao.getImageToReview( reviewId );
    const { insertId } = await reviewDao.updateReview( reviewId, content )
    return await reviewDao.createReviewImage( image ? image : image_url, insertId );
}

const deleteReview = async (classId, reviewId ) => {
    const { review } = await reviewDao.checkReview( classId, reviewId );
    if (review == 0 ) {
        const err= new Error("No reviews written");
        err.statusCode = 403;
        throw err
    }
    return await reviewDao.deleteReview( reviewId )
}

module.exports = {
    getReview,
    getReviewByUserId,
    postReview,
    editReview,
    deleteReview
}