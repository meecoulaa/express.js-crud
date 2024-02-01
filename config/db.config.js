const {Sequelize, Model } = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,  
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 20000,
    idle: 5000
  }

});

module.exports = sequelize;