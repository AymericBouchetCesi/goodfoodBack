const User = require('../models/user')

exports.getAllUsers = (req, res) => {
    User.findAll()
        .then(users => { res.json({ data: users }) })
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}


exports.getUsers = async (req, res) => {
    try {
        let userId = parseInt(req.params.id)
        if (!userId) {
            return res.status(400).json({ message: 'Missing parameter' })
        }
        
        let user = await User.findOne({ where: { id: userId }, raw: true })
        if (user === null) {
            return res.status(404).json({ message: 'This user does not exist' })
        }
        
        //user trouvé
        return res.json({ data: user })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addUsers = async (req, res) => {
    try {
        const { nom, prenom, email, password } = req.body
    
        //valide les données reçues
        if (!nom || !prenom | !email | !password) {
            return res.status(400).json({ message: 'Missing data' })
        }

        //vérif si user existe déjà
        let user = await User.findOne({ where: { email: email }, raw: true })
        .then(user => {
            if (user !== null) {
                return res.status(409).json({ message: `The email ${email} already exist` })
            }
        })

        //création user
        user = await User.create(req.body)
            .then(user => { res.json({ message: 'User created', data: user }) })
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
        
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.modifyUsers = async (req, res) => {
    try {
        //verif param
        let userId = parseInt(req.params.id)
        if (!userId) {
            return res.status(400).json({ message: 'Missing parameter' })
        }

        //verif user
        let user = await User.findOne({ where: { id: userId }, raw: true })
            if (user === null) {
                return res.status(404).json({ message: `The email does not exist` })
            }
        
        //mise à jour
        user = await User.update(req.body, { where: { id: userId } })
        return res.json({ message: 'User updated', data: user })
        
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.deleteUsers = async (req, res) => {
    try {
        let userId = parseInt(req.params.id)
        if (!userId) {
            return res.status(400).json({ message: 'Missing parameter' })
        }

        await User.destroy({ where: { id: userId }, force: true })
        return res.status(204).json({})

    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}