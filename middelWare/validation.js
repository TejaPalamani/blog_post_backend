const jwt = require("jsonwebtoken")



const validation = async (req, res, next) => {
    try {
        const auth = req.headers.Authorization || req.headers.authorization
        if (!auth) {
            req.status(401).json({ error: "Provide authorizationKey" })
        } else {
            const jwt_token = auth.split(" ")[1]
            jwt.verify(jwt_token, process.env.screat_token, async (err, decodeDetails) => {
                if (err) {
                    res.status(401).json({ error: "User not Authorized" })
                } else {
                    req.payload = decodeDetails
                    next()
                }

            })

        }



    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

module.exports = validation