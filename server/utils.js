const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const bearerToken = req.headers["authorization"]
    const token = bearerToken.split(' ')[1]

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({ success: false, message: "Invalid token", data: {} })
        }

        req.userId = decoded.id
    
        next()
    })
}

module.exports = verifyToken