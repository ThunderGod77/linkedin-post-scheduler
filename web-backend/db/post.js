//Post DB CRUD functions
var mongo = require('mongodb')
const {getDb} = require("./init")

async function addPost(post, userInfo) {
    try {
        
        const doc = {
            title: post.title,
            description: post.description,
            content: post.content,
            userId: userInfo.userId,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            expiresAt: new Date(post.expiresAt)
        }
        const cl = getDb()
        const result = await cl.db("sheduler").collection("posts").insertOne(doc)
        console.log(`A draft was inserted with the _id: ${result.insertedId}`);
        return (result.insertedId)
    } catch (err) {
        console.log(err)
    }

}
async function deletePost(postId, userId) {
    const doc = {
        _id: postId,
        userId: userId
    }
    try {
        const cl = getDb()
        const deleteResult =  await cl.db("sheduler").collection("posts").deleteOne(doc)
        console.log(deleteResult.deletedCount)
        return (deleteResult.deletedCount)
    } catch (err) {
        console.log(err)
    }


}
async function editPost(post, userId) {
    var newvalues = {
        $set: {
            title: post.title,
            description: post.description,
            content: post.content,
            updatedAt: new Date(Date.now()),
            expiresAt: new Date(post.expiresAt)
        }
    };
    var myquery = {
        _id: new mongo.ObjectId(post.id),
        userId: userId
    };

    try {
        const cl = getDb()
        const result = await cl.db("sheduler").collection("posts").updateOne(myquery, newvalues)
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
        );
        return (result.matchedCount)
    } catch (err) {
        console.log(err)
    }
}
async function findPostById(postId,userId) {
    const query = {
        userId: userId,
       _id: new mongo.ObjectId(postId)
    };
    console.log(query)
    

    try {
        const cl = getDb()
         
        const results = await cl.db("sheduler").collection("posts").findOne(query);
        console.log(results)
        return (results)
    } catch (err) {
        console.log(err)

    }


}
async function findPost(userId) {
    const query = {
        userId: userId
    };
    const options = {

        sort: {
            createdAt: -1
        },
    };

    try {
        const cursor = await posts.find(query, options);
        const results = cursor.toArray()
        console.log(results.length)
        return (results)
    } catch (err) {
        console.log(err)

    }


}


//DB USER CRUD functions







module.exports.findPostById=findPostById
module.exports.addPost = addPost
module.exports.editPost = editPost
module.exports.deletePost = deletePost
module.exports.findPost = findPost