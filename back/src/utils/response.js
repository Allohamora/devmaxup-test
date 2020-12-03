const express = require('express');

/**
 * 
 * @param {express.Response} res 
 * @returns {(params: { success: boolean, code?: number, message?: string, data?: any }) => void}
 */
const response = (res) => ({
  success,
  code,
  message,
  data
}) => {
  const finalCode = code 
    ? code 
    : (success ? 200 : 400);

  res.status(finalCode);

  res.send({
    success,
    message,
    data
  });
};

/**
 * 
 * @param {express.Response} res 
 */
const responseServerError = (res) => {
  response(res)({ success: false, message: 'Server Error!', code: 500 })
};

module.exports = {
  response,
  responseServerError,
};