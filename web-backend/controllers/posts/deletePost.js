const {deletePost} = require("./../../db/post")

async function removePost(req,res){
    const id = req.params.id;
    const userId = req.userInfo.userId
    const result = await deleteDraft(id,userId)
    res.status(200).json({result})

}

module.exports = removePost