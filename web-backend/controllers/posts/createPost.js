const {addPost} = require("./../../db/post")


async function createPost(req,res){
    const {title,description,content,expiresAt} = req.body
    const userInfo = req.userInfo
    const insertedId = await addPost({title,description,content,expiresAt},userInfo)
    res.status(201).json({postId:insertedId})

}

module.exports = createPost