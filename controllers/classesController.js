const { classesService } = require('../services')
const { asyncWrap }  = require('../middleware/errorControl')

const getclass = asyncWrap(async (req, res) => {
    
    const classId = req.params.classId;
    
    const classes = await classesService.getclass(classId)

    res.status(200).json({ classes })
})

module.exports = {
    getclass
}