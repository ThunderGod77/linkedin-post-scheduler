const express = require('express')
const authorizationMiddleware = require("./../controllers/middlewares/authorization")
const {
    signIn,
    register
} = require('./../controllers/user/signin')


const createDraft = require("./../controllers/drafts/createDraft")
const updateDraft = require("./../controllers/drafts/updateDraft")
const deleteDraft = require("./../controllers/drafts/deleteDraft")
const getDraft = require("./../controllers/drafts/getDraft")

const createPost = require("./../controllers/posts/createPost")
const updatePost = require("./../controllers/posts/editPost")
const deletePost = require("./../controllers/posts/deletePost")
const getPost = require("./../controllers/posts/getPost")



const userRouter = express.Router()

userRouter.post("/login", signIn)
userRouter.post("/", register)
userRouter.get('/test', function (req, res) {
    res.json({
        "lol": "lol"
    })
})





const draftRouter = express.Router()

draftRouter.post("/", authorizationMiddleware, createDraft)
draftRouter.put("/", authorizationMiddleware, updateDraft)
draftRouter.delete("/{draftId}", authorizationMiddleware, deleteDraft)
draftRouter.get("/", authorizationMiddleware, getDraft)


const postRouter = express.Router()

postRouter.post("/", authorizationMiddleware, createPost)
postRouter.put("/:id", authorizationMiddleware, updatePost)
postRouter.delete("/:id", authorizationMiddleware, deletePost)
postRouter.get("/:id", authorizationMiddleware, getPost)






module.exports.userRouter = userRouter
module.exports.draftRouter = draftRouter
module.exports.postRouter = postRouter