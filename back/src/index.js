const express = require('express');
const sequelize = require('./sequelize');
const apiRouter = require('./controllers');
const dotenv = require('dotenv');
const path = require('path');
const routeDecorator = require('./utils/routeDecorator');
const cors = require('cors');

dotenv.config();
const { PORT, NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';

const app = express();

if( !isProduction ) {
  app.use(cors());
}

app.use(express.json());
app.use('/api', apiRouter);

if( isProduction ) {
  const frontBuildPath = path.join(__dirname, '../../', 'front/build');
  const indexHtmlPath = path.join(frontBuildPath, 'index.html');

  app.use( express.static(frontBuildPath) );
  app.get('*', routeDecorator(({res}) => res.sendFile(indexHtmlPath)));
};

(async () => {
  // force === drop old tables
  await sequelize.sync();

  app.listen(PORT, () => console.log(`server started on ${PORT} port!`));
})();