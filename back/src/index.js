const express = require('express');
const sequelize = require('./sequelize');
const apiRouter = require('./controllers');
const dotenv = require('dotenv');

dotenv.config();
const {PORT} = process.env;

const app = express();

app.use(express.json());
app.use('/api', apiRouter);

(async () => {
  // force === drop old tables
  await sequelize.sync();

  app.listen(PORT, () => console.log(`server started on ${PORT} port!`));
})();