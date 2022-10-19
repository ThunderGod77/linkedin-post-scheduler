const Axios = require('axios');
const { MongoClient } = require('mongodb');


async function main() {

    const uri = "mongodb://localhost:27017/sheduler";


    const client = new MongoClient(uri);

    try {

        await client.connect();


        const pipeline = [
            {
                '$match': {
                    'operationType': 'delete',

                }
            }
        ];

        // This script contains three ways to monitor new listings in the listingsAndReviews collection.
        // Comment in the monitoring function you'd like to use.

        // OPTION ONE: Monitor new listings using EventEmitter's on() function.
        // await monitorListingsUsingEventEmitter(client, 30000, pipeline);

        // OPTION TWO: Monitor new listings using ChangeStream's hasNext() function
        await monitorListingsUsingHasNext(client);

        // OPTION THREE: Monitor new listings using the Stream API
        // await monitorListingsUsingStreamAPI(client, 30000, pipeline);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);





async function monitorListingsUsingHasNext(client, pipeline = []) {
    const collection = client.db("sheduler").collection("posts");


    const changeStream = collection.watch(pipeline);





    try {
        while (await changeStream.hasNext()) {
            let data = (await changeStream.next());
            if (data.operationType === "insert") {
                onInsert(client, data)
            } else if (data.operationType === "update") {
                onUpdate(client, data)
            } else if (data.operationType === "delete") {
                onExpiry(client, data)
            }

        }
    } catch (error) {
        if (false) {
            console.log("The change stream is closed. Will not wait on any more changes.")
        } else {
            throw error;
        }
    }
}

async function onInsert(client, data) {
    try {
        let doc = data.fullDocument


        if (doc.userId) {
            const userResult = await client.db("sheduler").collection("user").findOne({
                _id: doc.userId
            })
            if (userResult) {
                let accessToken = userResult.accessToken
                doc["accessToken"] = accessToken
                let result = await client.db("sheduler").collection("sysPost").insertOne(doc)
                console.log(result)

            } else {
                console.log("caanot retrieve user token")
            }
        }

    } catch (err) {
        console.log(err)
    }
}
async function onUpdate(client, data) {
    var newvalues = {
        $set: data.updateDescription.updatedFields
    };
    var myquery = data.documentKey
    try {
        const result = await client.db("sheduler").collection("sysPost").updateOne(myquery, newvalues)
        console.log(result)
    }
    catch (err) {
        console.log(err)
    }

}

function onDelete(client, data) {

}
async function onExpiry(client, data) {
    let documentKey = data.documentKey
    console.log(documentKey)
    const sysPostResult = await client.db("sheduler").collection("sysPost").findOne(
        documentKey
    )
    console.log(sysPostResult)
    if (sysPostResult) {
        console.log(sysPostResult.userId)
        let postData = {
            author: `urn:li:person:${sysPostResult.userId}`,
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": sysPostResult.content
                    },
                    "shareMediaCategory": "NONE"
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        }
        try {
            let token = "Bearer AQXbJnQy6KrKKQ9CiWXoVoO5UJJAxsD88-O9Om3Cfd6BZTXOVEHB8Ky8G983NH1uVlJsVLmk1H5lG_php3iPJomRSiPOVqQUzvwo4rfznY1MkCE5LZj-6YwZSvZaXSDuYza6Cm9jhqH0klKm_5Id8Ggj6M69Lk4rGqlQNuwdrHdqHKh3GnoZ1tusFulZSPGXBvNQEpnGl67tQpmwAH_wFTEBSaU4EKKm0KbC95uybhn_op15pZnOQnnfQridtdJeT0oJYcmzaSLR2175H2rFFQtlnz8vPrAUk3rTSfNcoXDMghnUbf52cvj0LK8IvrJZiH_bxL6cAI10RPqvahVDOgm_VCfY3A"
            let result = await Axios.post("https://api.linkedin.com/v2/ugcPosts", postData, { headers: { "X-Restli-Protocol-Version": "2.0.0", 'Authorization':token } })

        } catch (err) {
            console.log("error occured")
        }

    } else {
        console.log("post is delete or error ocurred")
    }

}
