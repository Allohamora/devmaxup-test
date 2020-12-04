const path = require('path');

module.exports = {
  storage: path.join(__dirname, '../../', 'database.sqlite'),
  dialect: 'sqlite'
};