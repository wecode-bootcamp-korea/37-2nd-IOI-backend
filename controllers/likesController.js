const { likesService }  = require('../services');
const { asyncWrap } = require('../middleware/errorControl.js')

const deleteLike = asyncWrap(async (req, res) => {
    const classId = req.params.classId;
    const userId = req.userId;

    await likesService.deleteLike(userId, classId);

    return res.status(200).json({ message : "DELETELIKE_SUCCESS"});

  })

const getLikeList = asyncWrap(async (req, res) => {
  const userId = req.userId;
  const likes = await likesService.getLikeList(userId);

  return res.status(200).json({ message : likes });

})

const inputLike = asyncWrap(async (req, res) => {

  const userId = req.userId;
  const classId = req.params.classId;

  await likesService.inputLike(userId, classId);

  return res.status(201).json({ message : "INPUTLIKE_SUCCESS"});

})

  module.exports = {
    deleteLike,
    getLikeList,
    inputLike
}