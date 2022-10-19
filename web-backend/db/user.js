const req = require("express/lib/request");

const {getDb} = require("./init")
async function addUser({
    id,
    firstName,
    lastName,
    email,
    accessToken,

}) {
    try {
        const doc = {
            _id: id,
            firstName,
            lastName,
            email,
            accessToken
        };
        const cl = getDb()
        const result = await cl.db("sheduler").collection("user").insertOne(doc)
        return result

    } catch (err) {
        console.log(err)
    }
}



async function findUser(userId) {
    console.log(userId)
    try {
        const cl = getDb()

        const userResult = await cl.db("sheduler").collection("user").findOne({
            _id: userId
        })
        console.log(userResult)
        if (userResult) {
            return {
                found: true,
                err: null,
                info: userResult
            }
        } else {

            return {
                found: false,
                err: null,
                info: undefined
            }
        }


    } catch (err) {
        return {
            found: false,
            err: err,
            info: undefined
        }
    }
}



module.exports.findUser = findUser
module.exports.addUser = addUser
