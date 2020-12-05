const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const getTimestamp = require('../utils/getTimestamp');
const Post = require('./Post');
const User = require('./User');

const EditPostLog = sequelize.define('edit-logs', {
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

EditPostLog.belongsTo(Post, { onDelete: 'CASCADE' });
EditPostLog.belongsTo(User, { onDelete: 'CASCADE' });

module.exports = EditPostLog;