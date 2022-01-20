/**import des modules */
const {Sequelize} = require('sequelize')

/**connexion bdd */
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
)

/**synchronisation des modeles */
sequelize.sync(err => {
    console.log(err)
})

module.exports = sequelize