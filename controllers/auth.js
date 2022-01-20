const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Bad email or password' })
    }

    User.findOne({ where: { email: email }, raw: true })
        .then(user => {
            if (user === null) {
                return res.status(401).json({ message: 'This account does not exist' })
            }

            let test = User.checkPassword(password, user.password)
            if(!test){
                return res.status(401).json({ message: 'Wrong password' })
            }

            const token = jwt.sign({
                id: user.id,
                nom: user.name,
                prenom: user.prenom
            }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })

            return res.json({ access_token: token })
        })
        .catch(err => res.status(500).json({message: 'Connection error', error: err}))
}