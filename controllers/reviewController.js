const { reviewService } = require("../services")
const { asyncWrap } = require("../middleware/errorControl");

const getReview = asyncWrap(async (req, res) => {
    const { classId } = req.params;
    const { offset, limit } = req.query;

    if ( !classId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }

    const review = await reviewService.getReview( classId, offset, limit );
    return res.status(200).json({ review: review})
})

const postReview = asyncWrap(async (req, res) => {
    const { userId, classId, content } = req.body;
    const image = req.file

    if ( !classId || !content) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }

    await reviewService.postReview( userId, classId, content, image );
    const review = await reviewService.getReviewByUserId( classId, userId );
    return res.status(200).json({ message: "Create Review Successfully", review: review})
})

const editReview = asyncWrap(async (req, res) => {
    console.log('body : ',req.body)
    const { userId, reviewId, content, classId } = req.body;
    const image = req.file
    if ( !reviewId || !content ) {
        const err =new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await reviewService.editReview( classId, reviewId, content, image );
    const review  = await reviewService.getReviewByUserId( classId, userId );
    return res.status(200).json({ message: "Update Review suceessfully", review: review });
})

const deleteReview = asyncWrap(async (req, res) => {
    const { userId } = req.body;
    const { classId, reviewId } = req.query;
    if ( !reviewId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await reviewService.deleteReview( classId, reviewId );
    const result = await reviewService.getReview ( classId, 0, 1000);
    return res.status(200).json({ review: result })
})

module.exports = {
    getReview,
    postReview,
    editReview,
    deleteReview
}