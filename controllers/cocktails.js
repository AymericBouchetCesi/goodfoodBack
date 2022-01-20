const Cocktail = require('../models/cocktail')

exports.getAllCocktails = (req, res) => {
    Cocktail.findAll()
        .then(cocktails => { res.json({ data: cocktails }) })
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getCocktails = async (req, res) => {
    try {
        let cocktailsId = parseInt(req.params.id)
        if (!cocktailsId) {
            return res.status(400).json({ message: 'Missing parameter' })
        }

        let cocktail = await Cocktail.findOne({ where: { id: cocktailsId }, raw: true })
        if (cocktail === null) {
            return res.status(404).json({ message: 'This cocktail does not exist' })
        }

        //cocktail trouvé
        return res.json({ data: cocktail })
        
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addCocktails = async (req, res) => {
    try {
        const { nom, description, recette } = req.body
    
        //valide les données reçu
        if (!nom || !description | !recette) {
            return res.status(400).json({ message: 'Missing data' })
        }

        //vérif si cocktail existe déjà
        let cocktail = await Cocktail.findOne({ where: { nom: nom }, raw: true })
        .then(cocktail => {
            if (cocktail !== null) {
                return res.status(409).json({ message: `The cocktail ${nom} already exist` })
            }
        })

        //création cocktail
        cocktail = await Cocktail.create(req.body)
            .then(cocktail => { res.json({ message: 'Cocktail created', data: cocktail }) })
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
        
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }

    
}

exports.modifyCocktails = async (req, res) => {
    try {
        //verif param
        let cocktailId = parseInt(req.params.id)
        if (!cocktailId) {
            return res.status(400).json({ message: 'Missing parameter' })
        }

        //verif cocktail
        let cocktail = await Cocktail.findOne(req.body, { where: { id: cocktailId }, raw: true })
            if (cocktail === null) {
                return res.status(409).json({ message: `The cocktail does not exist` })
            }

        //mise à jour
        cocktail = await Cocktail.update(req.body, { where: { id: cocktailId } })
        return res.json({ message: 'Cocktail updated', data: cocktail })

    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }

    
}

exports.deleteCocktails = async (req, res) => {
    try {
        let cocktailId = parseInt(req.params.id)
        if (!cocktailId) {
            return res.status(400).json({ message: 'Missing parameter' })
        }

        await Cocktail.destroy({ where: { id: cocktailId }, force: true })
        return res.status(204).json({})
        
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }

    
}