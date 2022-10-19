const {editDraft} = require("./../../db/init")

async function updateDraft(req,res){
    const {title,description,content,tag,id} = req.body
    const userId = req.userInfo.userId
    const insertedId = await editDraft({title,description,content,tag,id},userId)
    res.status(201).json({draftId:insertedId})

}

module.exports = updateDraft