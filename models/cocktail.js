/**import des modules */
const { DataTypes } = require('sequelize')
const db = require('../db.config')


/**definition du modele */
const Cocktail = db.define('Cocktail', {
    id:{
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    nom:{
        type: DataTypes.STRING(100),
        defaultValue:'',
        allowNull:false
    },
    description:{
        type: DataTypes.TEXT,
        defaultValue:'',
        allowNull:false
    },
    recette:{
        type: DataTypes.TEXT,
        defaultValue:'',
        allowNull:false
    },
}, {paranoid: true}) //softdelete

module.exports = Cocktail