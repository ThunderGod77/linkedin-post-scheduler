const jwt = require('jsonwebtoken')
const jwtSecret = "supersupersupersecretlol"

function authorization(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
    try {
        var decoded = jwt.verify(token, jwtSecret);
        req.userInfo = decoded
        next()
    } catch (err) {
        // err
        res.sendStatus(403)
    }
    
}

module.exports = authorization