const express = require('express');
const sequelize = require('./sequelize');
const User = require('./models/user');

const PORT = 3000;

const app = express();

app.get('/', async (req, res) => {
  await User.create({ name: Math.random() });
  res.send(JSON.stringify(await User.findAll()));
});

(async () => {
  // force === drop old tables
  await sequelize.sync();

  app.listen(PORT, () => console.log(`server started on ${PORT} port!`));
})();