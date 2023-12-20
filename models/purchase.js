const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const User = require('./user');
const Model = require('./model');

const Purchase = sequelize.define('purchase', {
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
}, {
  sequelize,
  freezeTableName: true,
  timestamps: true,
});

Purchase.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Purchase, {foreignKey: 'userId'})

Purchase.belongsTo(Model, { foreignKey: 'modelId' });
Model.hasMany(Purchase, {foreignKey: 'modelId'})

module.exports = Purchase;
