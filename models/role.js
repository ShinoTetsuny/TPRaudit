const sequelize = require('../database/database');
const { DataTypes } = require('sequelize');

const Role = sequelize.define('role', {
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
},{
    sequelize,
    freezeTableName: true
});

module.exports = Role;
