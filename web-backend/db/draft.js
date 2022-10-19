async function addDraft(draft, userInfo) {
    try {
        const doc = {
            title: draft.title,
            description: draft.description,
            content: draft.content,
            tag: draft.tag,
            userId: userInfo.userId,
            createdAt: new Date(Date.now()).toISOString(),
            updatedAt: new Date(Date.now()).toISOString()
        }
        const result = await drafts.insertOne(doc)
        console.log(`A draft was inserted with the _id: ${result.insertedId}`);
        return (result.insertedId)
    } catch (err) {
        console.log(err)
    }

}
async function deleteDraft(draftId, userId) {
    const doc = {
        _id: draftId,
        userId: userId
    }
    try {
        const deleteResult = await drafts.deleteOne(doc)
        console.log(deleteResult.deletedCount)
        return (deleteResult.deletedCount)
    } catch (err) {
        console.log(err)
    }


}
async function editDraft(draft, userId) {
    var newvalues = {
        $set: {
            title: draft.title,
            description: draft.description,
            content: draft.content,
            tag: draft.tag,
            updatedAt: new Date(Date.now()).toISOString()
        }
    };
    var myquery = {
        _id: draft.id,
        userId: userId
    };

    try {
        const result = await drafts.updateOne(myquery, newvalues)
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
        );
        return (result.matchedCount)
    } catch (err) {
        console.log(err)
    }
}
async function findDraft(userId) {
    const query = {
        userId: userId
    };
    const options = {

        sort: {
            createdAt: -1
        },
    };

    try {
        const cursor = await drafts.find(query, options);
        const results = cursor.toArray()
        console.log(results.length)
        return (results)
    } catch (err) {
        console.log(err)

    }


}










module.exports.addDraft = addDraft
module.exports.editDraft = editDraft
module.exports.deleteDraft = deleteDraft
module.exports.findDraft = findDraft
