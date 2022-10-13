const appDataSource = require("./dataSource");

const getVideo = async ( classId ) => {
    try {
        return await appDataSource.query(
            `SELECT
            id,
            class_id,
            video_url,
            name AS videoTitle,
            content AS videoDescription
            FROM videos
            WHERE class_id = ? `,
            [ classId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const getVideoByVideoId = async ( videoId ) => {
    try {
        return await appDataSource.query(
            `SELECT
            id,
            class_id,
            video_url,
            name AS videoTitle,
            content AS videoDescription
            FROM videos
            WHERE id = ? `,
            [ videoId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const createVideo = async ( classId, video, videoTitle, videoDescription ) => {
    try {
        return await appDataSource.query(`
            INSERT INTO videos(
                class_id,
                video_url,
                name,
                content
            ) VALUES( ?, ?, ?, ?)`,
            [ classId, video, videoTitle, videoDescription ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const updateVideo = async ( videoId, videoTitle, videoDescription, video ) => {
    try {
        return await appDataSource.query(`
            UPDATE videos SET
                name = ?,
                content = ?,
                video_url = ?
            WHERE id = ?`,
            [ videoTitle, videoDescription, video, videoId ]
        )
    } catch (err) {
        const error =new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const deleteVideo = async ( videoId ) => {
    try {
        return await appDataSource.query(`
            DELETE FROM videos
            WHERE id = ?`,
            [ videoId ]
        )
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

const checkVideo = async ( classId, videoId ) => {
    try {
        const [ video ] = await appDataSource.query(`
        SELECT EXISTS(
            SELECT
                *
            FROM videos
            WHERE class_id = ? AND id = ?
        ) AS review`,
        [ classId, videoId ]
        )
        return video;
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    getVideo,
    getVideoByVideoId,
    createVideo,
    updateVideo,
    deleteVideo,
    checkVideo
}