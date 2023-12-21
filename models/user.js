const sequelize = require('../database/database');
const { DataTypes } = require('sequelize');
const Role = require('./role');

const User = sequelize.define('user', {
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
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    sequelize,
    freezeTableName: true
})

//godId

User.belongsTo(Role, { foreignKey: 'roleId',
onDelete: 'CASCADE',
onUpdate: 'CASCADE' 
});

Role.hasMany(User, {
    foreignKey: 'roleId',

})

module.exports = User;
