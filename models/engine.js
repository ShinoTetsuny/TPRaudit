const sequelize = require('../database/database');
const { DataTypes } = require('sequelize');

const Engine = sequelize.define('engine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    freezeTableName: true
});

module.exports = Engine;
