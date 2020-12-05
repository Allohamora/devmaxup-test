const express = require('express');
const response = require('./response');
const { error } = require('./logger');

/**
 * 
 * @param {(routeData: {req: express.Request, res: express.Response, next: express.NextFunction, reply: ReturnType<response>}) => Promise | void} handler 
 * @param {boolean} isAsync 
 * @returns {(req: express.Request, res: express.Response, next: express.NextFunction) => Promise}
 */
const routeDecorator = (
  handler,
  isAsync = true,
) => async (req, res, next) => {
  const reply = response(res);

  try {
    const result = handler({ req, res, next, reply });

    if( isAsync ) await result;

  } catch (e) {
    error(e);
    return reply(({ success: false, message: 'Server Error!', code: 500 }));
  }
};

module.exports = routeDecorator;
