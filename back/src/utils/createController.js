const express = require('express');

/**
 * 
 * @param {string} path 
 */
const createController = (path) => ({ path, router: express.Router() });

module.exports = createController;
