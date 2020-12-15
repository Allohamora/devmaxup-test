const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const { getTodayFormattedDate } = require('../utils/date');
const Post = require('./Post');
const User = require('./User');

const EditPostStatistic = sequelize.define('edit-logs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  date: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: getTodayFormattedDate,
  }
});

EditPostStatistic.belongsTo(Post, { onDelete: 'CASCADE' });
EditPostStatistic.belongsTo(User, { onDelete: 'CASCADE' });

module.exports = EditPostStatistic;