/**import des modules */
const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')

const Cocktails = require('../controllers/cocktails')

/**récupération du router express */
let router = express.Router()

/**middleware pour date et heure */
router.use((req, res, next) => {
    const event = new Date()
    console.log(`Cocktail time : ${event.toString()}`)
    next()
})

/**routage de la ressource cocktail */
router.get('', Cocktails.getAllCocktails)

router.get('/:id', Cocktails.getCocktails)

router.put('', checkTokenMiddleware, Cocktails.addCocktails)

router.patch('/:id', checkTokenMiddleware, Cocktails.modifyCocktails)

router.delete('/:id', checkTokenMiddleware, Cocktails.deleteCocktails)

module.exports = router