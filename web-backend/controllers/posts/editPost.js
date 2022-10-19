const {editPost} = require("./../../db/post")

async function updatePost(req,res){
    const {title,description,content,expiresAt} = req.body
    const userId = req.userInfo.userId
    const id = req.params.id;
    const insertedId = await editPost({title,description,content,expiresAt,id},userId)
    res.status(201).json({draftId:insertedId})

}

module.exports = updatePost