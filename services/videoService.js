const { videoDao, classesDao } = require("../models")

const getVideo = async ( classId ) => {
    const getClass = await classesDao.getClass(classId);

    if ( !getClass ) {
        const err = new Error("INVALID_CLASS");
        err.statusCode = 404;
        throw err;
    }

    return await videoDao.getVideo( classId ); 
}

const getVideoByVideoId = async ( videoId ) => {
    const video = videoDao.getVideoByVideoId( videoId );

    if ( !video ) {
        const err = new Error("INVALID_VIDEO");
        err.statusCode = 404;
        throw err;
    }
    
    return await videoDao.getVideoByVideoId( videoId ); 
}

const postVideo = async ( classId, video, videoTitle, videoDescription ) => {
    const getClass = await classesDao.getClass(classId);
    if ( !getClass ) {
        const err = new Error("INVALID_CLASS");
        err.statusCode = 404;
        throw err
    }
    
    return await videoDao.createVideo( classId, video, videoTitle, videoDescription )
}

const editVideo = async ( videoId, videoTitle, videoDescription, video ) => {
    const { checkVideo } = await videoDao.checkVideo( videoId );
    if ( checkVideo == 0 ) {
        const err = new Error("No videos in class");
        err.statusCode = 403;
        throw err
    }

    if ( video ) video = video.location;
    const { video_url } = await videoDao.getVideo( videoId );
    return await videoDao.updateVideo( videoId, videoTitle, videoDescription, video ? video : video_url )
}

const deleteVideo = async ( videoId ) => {
    const { video } = await videoDao.getVideoByVideoId( videoId );
    if ( video == 0 ) {
        const err = new Error("No videos written")
        err.statusCode = 403;
        throw err
    }

    return await videoDao.deleteVideo( videoId )
}

module.exports = {
    getVideo,
    getVideoByVideoId,
    postVideo,
    editVideo,
    deleteVideo
}