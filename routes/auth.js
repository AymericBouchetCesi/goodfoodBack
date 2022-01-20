/**import des modules */
const express = require('express')

const Auth = require('../controllers/auth')

/**récupération du router express */
let router = express.Router()

/**middleware pour date et heure */
router.use((req, res, next) => {
    const event = new Date()
    console.log(`Auth time : ${event.toString()}`)
    next()
})

/**routage de la ressource auth */
router.post('/login', Auth.login)


module.exports = router