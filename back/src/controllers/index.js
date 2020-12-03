const express = require('express');
const users = require('./users');

const apiRoutes = [
  users
];

const apiRouter = express.Router();

apiRoutes.forEach(({ router, path }) => apiRouter.use(path, router));

module.exports = apiRouter;
