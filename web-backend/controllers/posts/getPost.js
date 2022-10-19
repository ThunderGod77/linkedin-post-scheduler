const {findPostById} = require("./../../db/post")


async function getPost(req,res,next){
    const userId  = req.userInfo.userId
    const id = req.params.id;
    console.log(id)
    let post = await findPostById(id,userId)
    res.status(200).json({post:post})
}


module.exports = getPost
