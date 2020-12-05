const { Sequelize } = require('sequelize');
const sqlite = require('./sqlite');

const sequelize = new Sequelize({
  ...sqlite,
  define: {
    timestamps: false
  },
  logging: false
});

module.exports = sequelize;