const jwt = require('jsonwebtoken')

/**extraction du token*/
const extractBearer = authorization => {
    if(typeof authorization !== 'string'){
        return false
    }

    /**on isole le token */
    const matches = authorization.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/** Verif token*/
const checkTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization && extractBearer(req.headers.authorization)
    console.log(token)

    if(!token){
        return res.status(401).json({message: `Ho le petit malin`})
    }

    /**verif validité du token */
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        console.log(decodedToken)
        if(err){
            return res.status(401).json({message: `Bad Token`})
        }
        next()
    })
}

module.exports = checkTokenMiddleware