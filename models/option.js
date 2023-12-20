const sequelize = require('../database/database');
const { DataTypes } = require('sequelize');

const Option = sequelize.define('option', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
},{
    sequelize,
    freezeTableName: true
})

module.exports = Option;
