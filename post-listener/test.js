const Axios = require('axios')

async function test(){
    let postData = {
        author: `urn:li:person:Q6eEnz_3EM`,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": "lopoooooooooo"
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
        console.log(err)
    }

}
test()