const express = require('express');
const users = require('./users');
const posts = require('./posts');
const statistics = require('./statistics');

const apiRoutes = [
  users,
  posts,
  statistics
];

const apiRouter = express.Router();

apiRoutes.forEach(({ router, path }) => apiRouter.use(path, router));

module.exports = apiRouter;
