const appDataSource = require('./dataSource')

const getUserById = async(userId) => {
    return await appDataSource.query(`
    SELECT
        id,
        account_email,
        name,
        profile_image
        kakao_id
    FROM users
    WHERE id=?`
    , [userId]
    );
}

const getUserByKakaoId = async(kakaoId) => {
    return await appDataSource.query(`
    SELECT
        id,
        account_email,
        name,
        profile_image
        kakao_id
    FROM users
    WHERE kakao_id=?`
    , [kakaoId]
    );
}

const createUser = async (email, name, kakaoId, profileImage) => {
    return await appDataSource.query(`
    INSERT INTO users(
        account_email,
        name,
        kakao_id,
        profile_image
    ) VALUES (?, ?, ?, ?)`
    , [email, name, kakaoId, profileImage]
    )
}

module.exports = {
    getUserById,
    getUserByKakaoId,
    createUser
}