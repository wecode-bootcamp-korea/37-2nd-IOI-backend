const appDataSource = require("./dataSource");

const getReview = async( classId, offset, limit) => {
    try {
        return await appDataSource.query(`
            SELECT
                reviews.id AS reviewId,
                users.name,
                reviews.content,
                review_images.image_url,
                users.id AS userId
            FROM reviews
            INNER JOIN users ON reviews.user_id = users.id
            INNER JOIN review_images ON reviews.id = review_images.review_id
            WHERE reviews.class_id = ?
            ORDER BY reviews.id desc LIMIT ?,?`,
            [ classId, offset, limit ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const getReviewByUserId = async( classId, userId ) => {
    try {
        return await appDataSource.query(`
            SELECT
                id,
                user_id,
                class_id,
                content
            FROM reviews
            WHERE class_id = ? AND user_id = ?
            ORDER BY reviews.id desc`,
            [ classId, userId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const createReview = async ( userId, classId, content ) => {
    try {
        return await appDataSource.query(`
            INSERT INTO reviews(
                user_id,
                class_id,
                content
            ) VALUES( ?, ?, ? )`,
            [ userId, classId, content ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const createReviewImage = async ( image, reviewId ) => {
    try {
        return await appDataSource.query(`
            INSERT INTO review_images(
                review_id,
                image_url
            ) VALUES( ?, ? )`,
            [ reviewId, image]
        )
    } catch (err) {
        console.log(err)
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const checkReview = async ( classId, reviewId ) => {
    try {
        console.log(classId)
        console.log(reviewId)
        const [ review ] = await appDataSource.query(`
            SELECT EXISTS(
                SELECT
                    *
                FROM reviews
                WHERE class_id = ? AND id = ?
                ) AS review`,
            [ classId, reviewId ]
        )
        return review;
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const updateReview = async ( reviewId, content ) => {
    try {
        return await appDataSource.query(`
            UPDATE reviews SET
                content = ?
            WHERE id = ?`,
            [ content, reviewId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw err;
    }
}

const deleteReview = async ( reviewId ) => {
    try {
        return await appDataSource.query(`
            DELETE
            FROM reviews
            WHERE id = ?`,
            [ reviewId ]
        )
    } catch (err) {
        console.log('error message : ',err)
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const getImageToReview = async ( reviewId ) => {
    try {
        const [ image ] = await appDataSource.query(
            `SELECT
                image_url,
                review_id
            FROM review_images
            WHERE review_id = ?`,
            [ reviewId ]
        )
        return image
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    getReview,
    getReviewByUserId,
    createReview,
    createReviewImage,
    checkReview,
    updateReview,
    deleteReview,
    getImageToReview
}