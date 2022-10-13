const { videoService } = require("../services");
const { asyncWrap } = require("../middleware/errorControl")

const getVideo = asyncWrap(async (req, res) => {
    const { classId } = req.params;
    const userId = req.userId;

    if ( !classId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
 
    const video = await videoService.getVideo( classId, userId );
    return res.status(200).json({video: video})
})

const postVideo = asyncWrap(async (req, res) => {
    const { classId, videoTitle, videoDescription } = req.body;
    const video = req.file.location;

    if ( !classId || !video || !videoTitle || !videoDescription ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }

    await videoService.postVideo( classId, video, videoTitle, videoDescription );
    const classVideo = await videoService.getVideo(classId);
    return res.status(201).json({ message: "Create Video Successfully", video: classVideo })
})

const editVideo = asyncWrap(async (req, res) => {
    const { classId, videoId, videoTitle, videoDescription } = req.body;
    const video = req.file;
    if ( !classId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await videoService.editVideo( videoId, videoTitle, videoDescription, video );
    const classVideo = await videoService.getVideo(classId);
    return res.status(200).json({ message: "Update Video Info Successfully", video: classVideo })
})

const deleteVideo = asyncWrap(async (req, res) => {
    const { classId, videoId } = req.query;
    if ( !videoId ) {
        const err = new Error("KEY_ERROR");
        err.statusCode = 400;
        throw err;
    }
    await videoService.deleteVideo( videoId );
    return res.status(200).json({ message: "Delete Video Successfully" })
})

module.exports = {
    getVideo,
    postVideo,
    editVideo,
    deleteVideo

}