const { Sequelize } = require('sequelize');
const sqlite = require('./sqlite');

const sequelize = new Sequelize({
  ...sqlite,
  define: {
    timestamps: false
  },
  logging: console.log
});

module.exports = sequelize;