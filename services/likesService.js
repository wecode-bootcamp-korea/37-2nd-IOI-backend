const { likesDao } = require('../models');

const inputLike = async (userId, classId) => {
    
    const doesExist = await likesDao.checkLike(userId, classId);

    if(+doesExist){
        const error = new Error("ALREADY_EXISTS_IN_LIKE");
        error.statusCode = 403;
        throw error;
    }
    await likesDao.inputLike(userId, classId);
    let increseLike = await likesDao.increseLike(classId);
}

const deleteLike = async (userId, classId) => {

    const doesExist = await likesDao.twocheckLike(userId, classId);

    if(!doesExist){
        const error = new Error("ALREADY_EXISTS_OUT_LIKE");
        error.statusCode = 403;
        throw error;
    }
    await likesDao.deleteLike(userId, classId);
    let decreseLike = await likesDao.decreseLike(classId);
}

const getLikeList = async (userId) => {

	return await likesDao.getLikeList(userId);

}


module.exports = { 
    inputLike,
    getLikeList,
    deleteLike
}