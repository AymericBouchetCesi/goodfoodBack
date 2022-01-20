/**import des modules */
const express = require('express')

const Users = require('../controllers/users')

/**récupération du router express */
let router = express.Router()

/**middleware pour date et heure */
router.use((req, res, next) => {
    const event = new Date()
    console.log(`User time : ${event.toString()}`)
    next()
})

/**routage de la ressource User */
router.get('', Users.getAllUsers)


router.get('/:id', Users.getUsers)

router.put('', Users.addUsers)

router.patch('/:id', Users.modifyUsers)

router.delete('/:id', Users.deleteUsers)

module.exports = router