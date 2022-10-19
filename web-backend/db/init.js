const assert = require("assert");
const client = require("mongodb").MongoClient;

let _db;


function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    
    client.connect('mongodb://localhost:27017/sheduler', {}, connected);

    function connected(err, cl) {
        if (err) {
            return callback(err);
        }
        console.log("DB initialized");
        _db = cl;
        return callback(null, _db);
    }
    
}

function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}
async function addIndex(){
    let cl = getDb()
    const posts = cl.db("sheduler").collection("posts")
    
    const result = await posts.createIndex({ expiresAt: 1 },{ expireAfterSeconds: 0 });
    console.log(result)
}

module.exports.initDb = initDb
module.exports.getDb = getDb
module.exports.addIndex = addIndex

//Drafts Crud function

