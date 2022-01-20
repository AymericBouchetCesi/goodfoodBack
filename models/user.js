/**import des modules */
const { DataTypes } = require('sequelize')
const db = require('../db.config')
const bcrypt = require('bcrypt')


/**definition du modele */
const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i
    },
}, { paranoid: true }) //softdelete

User.beforeCreate(async (user, options) => {
    const hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
    user.password = hash
})

User.checkPassword = (password, originel) => {
    const test = bcrypt.compare(password, originel)
    return test
}

module.exports = User