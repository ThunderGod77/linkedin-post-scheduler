const Axios = require('axios')
const jwt = require('jsonwebtoken');
const {
    findUser,
    addUser
} = require('../../db/user')
const querystring = require('querystring');


//TODO
//function get user's linkedin oauth access token
const clientSecret = "ZF8tjVGsG3HQ8irT"
const clientId = "865qqkkafh82yf"
const grantType = "authorization_code"
const redirectURI = "http://localhost:3000/login/linkedin"
const linkedinAccessTokenURL = "https://www.linkedin.com/oauth/v2/accessToken"
const jwtSecret = "supersupersupersecretlol"




//helper functions





async function signIn(req, res, next) {
    const accessCode = req.body.code

    let requestData = {
        "grant_type": grantType,
        "code": accessCode,
        "client_id": clientId,
        "client_secret": clientSecret,
        "redirect_uri": redirectURI
    }
    try {
        let response = await Axios.post(linkedinAccessTokenURL,
            querystring.stringify(requestData), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        )
        console.log(response.data)
        let token = response.data.access_token
        let userDetails = await getUserDetails(token)
        let userId = userDetails.id

        let {
            found,
            err,
            info
        } = await findUser(userId)
        if (err) {
            console.log(err)
            return res.status(500).json({
                err: "connection error!"
            })
        }

        if (!found) {
            let userEmailResponse = await getUserEmail(token)
            let firstName = userDetails.firstName.localized["en_US"]
            let lastName = userDetails.lastName.localized["en_US"]
            let email = (userEmailResponse.elements[0]["handle~"].emailAddress)

            let id = userId

            console.log({
                action: "register",
                id,
                firstName,
                lastName,
                email,
                token
            })
            return res.status(200).json({
                action: "register",
                id,
                firstName,
                lastName,
                email,
                token
            })
        } else {
            const token = await jwt.sign({
                userId: userId,
                firstName: info.firstName
            }, jwtSecret, {
                expiresIn: 600 * 60
            });
            res.status(200).json({
                token,
                firstName: info.firstName,
                id: userId,
                action: "login"
            })

        }



    } catch (error) {
        console.log(error)
    }



}


//TODO
//get user details using linkedin api
const linkedinUserDetailURL = "https://api.linkedin.com/v2/me"
async function getUserDetails(accessToken) {
    const bearerToken = "Bearer " + accessToken
    try {
        let response = await Axios.get(linkedinUserDetailURL, {
            headers: {
                "Authorization": bearerToken
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)

    }



}







//TODO
//get user email using linkedin api
const linkedinUserEmailApi = "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))"
async function getUserEmail(accessToken) {
    const bearerToken = "Bearer " + accessToken
    try {
        let response = await Axios.get(linkedinUserEmailApi, {
            headers: {
                "Authorization": bearerToken
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)

    }

}

//TODO
//create user
async function createUser(req, res, next) {

    let {
        id,
        firstName,
        lastName,
        email,
        accessToken
    } = req.body
    console.log({
        id,
        firstName,
        lastName,
        email,
        accessToken
    })
    const result = await addUser({
        id,
        firstName,
        lastName,
        email,
        accessToken
    })
    console.log(result)
    const token = await jwt.sign({
        userId: id,
        firstName: firstName
    }, jwtSecret, {
        expiresIn: 600 * 60
    });
    res.status(201).json({
        token,
        firstName: firstName,
        action: "login",

    })

}









module.exports.signIn = signIn
module.exports.register = createUser