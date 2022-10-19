const {addDraft} = require("./../../db/init")


async function createDraft(req,res){
    const {title,description,content,tag} = req.body
    const userInfo = req.userInfo
    const insertedId = await addDraft({title,description,content,tag},userInfo)
    res.status(201).json({draftId:insertedId})

}

module.exports = createDraft