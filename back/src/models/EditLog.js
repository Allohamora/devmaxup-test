const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const getTimestamp = require('../utils/getTimestamp');
const Post = require('./Post');
const User = require('./User');

const EditLog = sequelize.define('edit-logs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: getTimestamp(),
  }
});

EditLog.belongsTo(Post, { onDelete: 'CASCADE' });
EditLog.belongsTo(User, { onDelete: 'CASCADE' });

module.exports = EditLog;