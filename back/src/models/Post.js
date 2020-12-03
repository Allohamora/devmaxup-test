const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');

const Post = sequelize.define('posts', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(35),
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Post.belongsTo(User, { onDelete: 'CASCADE' });

module.exports = Post;
