const {findDraft} = require("./../../db/init")

async function getDraft(req,res,next){
    const userId  = req.userInfo.userId
    let drafts = await findDraft(userId)
    res.status(200).json({drafts:drafts})
}

module.exports = getDraft