const {deleteDraft} = require("./../../db/init")

async function removeDraft(req,res){
    const {draftId} = req.body
    const userId = req.userInfo.userId
    const insertedId = await deleteDraft(draftId,userId)
    res.status(200).json({draftId})

}

module.exports = removeDraft