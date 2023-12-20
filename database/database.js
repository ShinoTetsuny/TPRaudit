const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DTB, process.env.DB_USER, process.env.DB_PWD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb'
  });


sequelize.authenticate().then(() => {
    console.log("Authentification Réussie");
}).catch((err) => {
    console.log("Erreur :", err);
});

module.exports = sequelize;
