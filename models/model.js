const sequelize = require('../database/database');
const { DataTypes } = require('sequelize');
const Option = require('./option');
const Engine = require('./engine')

const Model = sequelize.define('model', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    seat: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    door: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
},{
    sequelize,
    freezeTableName: true
})

//roleId
Model.belongsToMany(Option, { through: 'ModelOption' })
Option.belongsToMany(Model, { through: 'ModelOption' })



Model.belongsTo(Engine, { foreignKey: 'engineId' })
Engine.hasMany(Model, { foreignKey: 'engineId' })

module.exports = Model;
