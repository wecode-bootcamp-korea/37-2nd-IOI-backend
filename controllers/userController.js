const { userService } = require("../services")
const { asyncWrap } = require("../middleware/errorControl");

const signInKakao = asyncWrap(async (req, res) => {
    const kakaoToken = req.body.Token

    const accessToken = await userService.signInKakao(kakaoToken);
    return res.status(200).json({ accessToken: accessToken });
});

module.exports = {
    signInKakao
}